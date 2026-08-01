import copy
import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("solana_signal", ROOT / "collector/solana_signal.py")
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules["solana_signal"] = MODULE
SPEC.loader.exec_module(MODULE)


class ValidatorSnapshotTests(unittest.TestCase):
    def test_concentration_and_delinquency(self):
        current = [
            {"votePubkey": "vote-a", "nodePubkey": "node-a", "activatedStake": 400, "commission": 5},
            {"votePubkey": "vote-b", "nodePubkey": "node-b", "activatedStake": 350, "commission": 7},
            {"votePubkey": "vote-c", "nodePubkey": "node-c", "activatedStake": 200, "commission": 8},
        ]
        delinquent = [{"votePubkey": "vote-d", "nodePubkey": "node-d", "activatedStake": 50, "commission": 10}]
        result = MODULE.validator_snapshot(current, delinquent)
        self.assertEqual(result["nakamoto_coefficient"], 1)
        self.assertEqual(result["delinquent_stake_pct"], 5)
        self.assertEqual(result["top"][0]["identity"], "node-a")
        self.assertTrue(result["top"][-1]["delinquent"])


class AnomalyTests(unittest.TestCase):
    def setUp(self):
        self.report = json.loads((ROOT / "public/data/latest.json").read_text())
        self.report["network"]["tps"]["value"] = 2_500
        self.report["network"]["slotTime"]["value"] = 0.42
        self.report["validators"]["delinquentStakePct"]["value"] = 0.3
        self.report["markets"]["solChange24h"]["value"] = 2.5

    def test_all_clear(self):
        alerts = MODULE.anomaly_alerts(self.report)
        self.assertEqual(alerts[0]["id"], "all-clear")

    def test_multiple_rules_can_fire(self):
        self.report["network"]["tps"]["value"] = 900
        self.report["network"]["slotTime"]["value"] = 0.7
        self.report["validators"]["delinquentStakePct"]["value"] = 5.1
        self.report["markets"]["solChange24h"]["value"] = -11
        alerts = MODULE.anomaly_alerts(self.report)
        self.assertEqual({row["id"] for row in alerts}, {"tps-low", "slot-slow", "stake-delinquent", "price-move"})
        self.assertEqual(next(row for row in alerts if row["id"] == "stake-delinquent")["severity"], "critical")


class ArtifactTests(unittest.TestCase):
    def test_markdown_exposes_provenance_and_missing_values(self):
        report = json.loads((ROOT / "public/data/latest.json").read_text())
        markdown = MODULE.render_markdown(report)
        self.assertIn("## Source map", markdown)
        self.assertIn("live · Solana RPC", markdown)
        self.assertIn("derived · Solana Data", markdown)
        self.assertIn("curated", markdown)

    def test_matching_json_and_markdown_are_written(self):
        report = json.loads((ROOT / "public/data/latest.json").read_text())
        with tempfile.TemporaryDirectory() as directory:
            json_path, markdown_path = MODULE.write_report(report, Path(directory))
            self.assertEqual(json.loads(json_path.read_text())["schemaVersion"], "1.0.0")
            self.assertTrue(markdown_path.read_text().startswith("# Solana Signal"))


if __name__ == "__main__":
    unittest.main()
