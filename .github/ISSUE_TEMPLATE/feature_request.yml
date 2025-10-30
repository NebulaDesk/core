name: Feature request
about: Suggest a new feature, widget, or improvement for NebulaDesk Core
title: "[Feature]: "
labels: ["enhancement"]
assignees: ""
type: enhancement

body:
  - type: markdown
    attributes:
      value: |
        ## 💡 Feature Request
        Thanks for contributing ideas to improve NebulaDesk Core!  
        Please describe the feature you’d like to see and why it would be useful.

  - type: input
    id: summary
    attributes:
      label: Feature summary
      description: "Briefly describe the new feature or improvement."
      placeholder: "Example: Add a light/dark theme toggle"
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem to solve
      description: "What problem or limitation does this feature address?"
      placeholder: "Example: The interface is hard to read in bright environments."
    validations:
      required: true

  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      description: "How do you envision this feature working?"
      placeholder: "Example: A toggle button in the header that switches between light and dark mode."
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives or workarounds considered
      description: "List any other approaches or ideas you've thought of."
      placeholder: "Example: Manually editing CSS variables to simulate light mode."
    validations:
      required: false

  - type: dropdown
    id: area
    attributes:
      label: Feature area
      description: "Which part of NebulaDesk Core does this relate to?"
      options:
        - Core (PWA / app shell)
        - Storage / Encryption
        - Widgets
        - UI / UX
        - Security / CSP
        - Docs
        - Other
    validations:
      required: true

  - type: input
    id: priority
    attributes:
      label: Priority level (optional)
      description: "Helps us understand urgency."
      placeholder: "Low / Medium / High"
    validations:
      required: false

  - type: checkboxes
    id: confirmation
    attributes:
      label: Confirmation
      options:
        - label: I have searched existing issues to avoid duplicates.
          required: true
        - label: I am willing to help design or test this feature.
          required: false
