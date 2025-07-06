```md
name: 🐞 Bug Report
description: Report something that isn't working
title: "[Bug] "
labels: bug

body:
  - type: textarea
    id: describe
    attributes:
      label: What happened?
      placeholder: A clear and concise description of the bug.
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      placeholder: How can we reproduce it?
    validations:
      required: false

  - type: dropdown
    id: os
    attributes:
      label: Operating System
      options:
        - Windows
        - macOS
        - Linux
        - Other
    validations:
      required: true

  - type: dropdown
    id: browser
    attributes:
      label: Browser and Version
      description: What browser are you seeing the problem on?
      options:
        - Chrome
        - Firefox
        - Safari
        - Edge
        - Other
    validations:
      required: true
  
  - type: input
    id: version
    attributes:
      label: Package Version
      placeholder: e.g. 1.1.2
  
  - type: textarea
    id: visuals
    attributes:
      label: Screenshots or Recordings
      description: "If applicable, please add screenshots or a screen recording to help explain the problem. You can drag and drop files here."
    validations:
      required: false
```