var WHUnitRaw = {
    "Plaguebearers": {
        "price": 90,
        "models": ["Plaguebearer", "Plaguer"],
        "structure": {
            "Plaguebearer": 10
        },
        "options": {
            "opt1": {
                "type": "addModel",
                "model": "Plaguebears",
                "text": "Можно включить до десяти дополнительных чумоносцев",
                "condition": {
                    "type": "max used",
                    "value": "10"
                },
                "cost": 9
            }
        }
    }
}

