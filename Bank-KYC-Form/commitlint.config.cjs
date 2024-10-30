module.exports = {
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "feat","fix", "wip", "build", "refactor"
        ],
      ],
      "type-case": [
        2,
        "always",
        "lower-case"
      ],
      "type-empty": [
        2,
        "never"
      ],
      "type-max-length": [
        2,
        "always",
        8
      ],
      "scope-case": [
        2,
        "always",
        "lower-case"
      ],
      "subject-case": [
        2,
        "always",
        "lower-case"
      ],
      "subject-empty": [
        2,
        "never"
      ],
      "subject-max-length": [ 2,
        "always",
        60
      ],
    },
  };