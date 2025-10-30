name: Bug report
about: Report a bug or unexpected behavior in NebulaDesk Core
title: "[Bug]: "
labels: ["bug"]
assignees: ""
type: bug

body:
  - type: markdown
    attributes:
      value: |
        ## 🐞 Bug Report
        Thanks for taking the time to help improve NebulaDesk Core!  
        Please fill out the details below so we can reproduce and fix the issue quickly.

  - type: input
    id: summary
    attributes:
      label: Brief summary
      description: "What happened in one or two sentences?"
      placeholder: "Example: The Notes widget doesn't unlock after entering the passphrase"
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: "List clear steps that trigger the bug."
      placeholder: |
        1. Go to ...
        2. Click ...
        3. See error ...
      render: bash
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      description: "What did you expect to happen?"
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual behavior
      description: "What actually happened?"
    validations:
      required: true

  - type: dropdown
    id: area
    attributes:
      label: Affected area
      options:
        - Core (PWA / service worker)
        - Storage / Encryption
        - Widgets
        - Docs
        - Security / CSP
        - Other
    validations:
      required: true

  - type: input
    id: version
    attributes:
      label: Version or commit
      placeholder: "v0.1.0 or 7a1b2c3"
    validations:
      required: false

  - type: textarea
    id: logs
    attributes:
      label: Console errors or logs
      description: "Paste any relevant console output or screenshots."
      render: bash

  - type: checkboxes
    id: confirmation
    attributes:
      label: Confirmation
      options:
        - label: I have searched existing issues before submitting this one.
          required: true
        - label: I am using the latest version of NebulaDesk Core.
          required: false
