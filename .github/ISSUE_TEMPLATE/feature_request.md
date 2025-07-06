```md
name: 💡 Feature Request
description: Suggest an idea or improvement
title: "[Feature] "
labels: enhancement

body:
  - type: textarea
    id: idea
    attributes:
      label: What's your idea?
      placeholder: Describe your feature or improvement in detail.
    validations:
      required: true

  - type: textarea
    id: usecase
    attributes:
      label: Why is this feature useful?
      placeholder: Explain the problem it solves or the benefit it provides.
    validations:
      required: true

  - type: textarea
    id: implementation
    attributes:
      label: Any thoughts on implementation? (Optional)
      placeholder: Do you have any ideas on how this could be implemented?
    validations:
      required: false
```