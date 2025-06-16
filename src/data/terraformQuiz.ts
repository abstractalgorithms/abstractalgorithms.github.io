export const terraformQuizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of Terraform?",
    options: [
      "To manage container orchestration",
      "To automate infrastructure provisioning and management",
      "To monitor application performance",
      "To manage source code versions"
    ],
    correctAnswer: 1,
    explanation: "Terraform is an Infrastructure as Code (IaC) tool that allows you to define and provision infrastructure using declarative configuration files."
  },
  {
    id: 2,
    question: "Which of the following is the correct syntax for defining a variable in Terraform?",
    options: [
      "var instance_type = \"t2.micro\"",
      "variable \"instance_type\" { default = \"t2.micro\" }",
      "let instance_type = \"t2.micro\"",
      "def instance_type \"t2.micro\""
    ],
    correctAnswer: 1,
    explanation: "Variables in Terraform are defined using the 'variable' block with optional attributes like default, description, and type."
  },
  {
    id: 3,
    question: "What file extension do Terraform configuration files use?",
    options: [
      ".tf",
      ".terraform",
      ".hcl",
      ".config"
    ],
    correctAnswer: 0,
    explanation: "Terraform configuration files use the .tf extension and are written in HashiCorp Configuration Language (HCL)."
  },
  {
    id: 4,
    question: "What is the purpose of the 'terraform init' command?",
    options: [
      "To create a new Terraform project",
      "To initialize a working directory and download providers",
      "To apply the configuration",
      "To validate the configuration syntax"
    ],
    correctAnswer: 1,
    explanation: "'terraform init' initializes a working directory containing Terraform configuration files and downloads the necessary provider plugins."
  },
  {
    id: 5,
    question: "In Terraform modules, what is the purpose of output values?",
    options: [
      "To display debugging information",
      "To return values from a module for use in other configurations",
      "To store sensitive data",
      "To configure provider settings"
    ],
    correctAnswer: 1,
    explanation: "Output values in Terraform modules allow you to export information about your infrastructure that can be used by other configurations or displayed to users."
  },
  {
    id: 6,
    question: "What is the difference between 'terraform plan' and 'terraform apply'?",
    options: [
      "There is no difference",
      "'plan' shows what changes will be made, 'apply' actually makes the changes",
      "'plan' applies changes, 'apply' shows what will change",
      "'plan' is for testing, 'apply' is for production"
    ],
    correctAnswer: 1,
    explanation: "'terraform plan' creates an execution plan showing what actions Terraform will take, while 'terraform apply' actually executes those actions to reach the desired state."
  },
  {
    id: 7,
    question: "Which of the following is a best practice for managing Terraform state?",
    options: [
      "Store state files in version control",
      "Use remote state storage with locking",
      "Keep state files on local machines only",
      "Delete state files after each apply"
    ],
    correctAnswer: 1,
    explanation: "Using remote state storage with locking is a best practice as it enables team collaboration, provides backup, and prevents conflicts when multiple users work on the same infrastructure."
  },
  {
    id: 8,
    question: "What is the purpose of data sources in Terraform?",
    options: [
      "To create new resources",
      "To fetch information about existing infrastructure",
      "To store configuration data",
      "To define provider settings"
    ],
    correctAnswer: 1,
    explanation: "Data sources in Terraform allow you to fetch information about existing infrastructure or resources that are managed outside of your current Terraform configuration."
  },
  {
    id: 9,
    question: "Which lifecycle rule would prevent a resource from being destroyed?",
    options: [
      "prevent_destroy = true",
      "ignore_changes = all",
      "create_before_destroy = true",
      "replace_triggered_by = []"
    ],
    correctAnswer: 0,
    explanation: "The 'prevent_destroy = true' lifecycle rule prevents Terraform from destroying a resource, which is useful for protecting critical infrastructure."
  },
  {
    id: 10,
    question: "What is Terraform Cloud primarily used for?",
    options: [
      "Local development only",
      "Remote execution, state management, and collaboration",
      "Container deployment",
      "Database management"
    ],
    correctAnswer: 1,
    explanation: "Terraform Cloud provides remote execution of Terraform runs, secure state storage, team collaboration features, and policy enforcement for infrastructure management."
  }
]
