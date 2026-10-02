export const docsContent = {
  en: {
    hero: {
      eyebrow: "TECHNICAL HANDBOOK & REFERENCE",
      title: "Research Kit Documentation",
      subtitle: "The comprehensive guide to installing, configuring, and conducting empirical research with the 10 procedural skills across AI agents (Cursor, Claude Code, Codex, Antigravity). Source Markdown lives in documents/.",
      stats: [
        { label: "Pipeline", value: "6 Core Stages" },
        { label: "Extensions", value: "4 Domains" },
        { label: "Standing Context", value: "<0.50%" },
        { label: "Runtime Scripts", value: "0 (Pure SOP)" },
      ],
    },
    nav: {
      lifecycle: "Installation & Lifecycle",
      architecture: "Multi-Paper Workspace",
      coreSkills: "Core Pipeline Skills (6)",
      domainSkills: "Domain Extensions (4)",
      playbook: "End-to-End Playbook",
      cheatsheet: "Decision Matrix & Prompts",
      antipatterns: "Anti-Patterns & Pitfalls",
    },
    lifecycle: {
      title: "Lifecycle Management: Install, Update & Remove",
      desc: "Research Kit skills are pure Markdown Standard Operating Procedures (SOPs) complying with the Agent Skills specification. They run with zero persistent daemon processes and zero external scripts.",
      methods: [
        {
          id: "skills-cli",
          name: "Skills CLI (Recommended by Vercel Labs)",
          desc: "The standard agent skills manager with full CRUD support across popular coding agents.",
          installCmd: "npx skills add vinhnt21/research-kit",
          updateCmd: "npx skills update            # Check & update all\nnpx skills update -y         # Unattended (CI/auto)\nnpx skills update rk-survey  # Update single skill",
          removeCmd: "npx skills remove            # Interactive selection\nnpx skills remove rk-ai -y   # Remove single skill",
        },
        {
          id: "github-cli",
          name: "GitHub CLI (v2.90.0+)",
          desc: "Install directly into specific agent profiles via native GitHub CLI commands.",
          installCmd: "gh skill install vinhnt21/research-kit --agent cursor\n# Options: --agent claude-code | --agent codex | --agent antigravity",
          updateCmd: "gh skill update --dry-run    # Preview changes\ngh skill update --all        # Update all skills\ngh skill update rk-data      # Update single skill",
          removeCmd: "# Note: gh skill currently lacks native remove (Issue #13706)\ngh skill list --json name,path  # 1. Locate install path\nrm -rf <path_to_skill>          # 2. Delete skill directory",
        },
        {
          id: "agent-assisted",
          name: "Agent-Assisted Installation (ZIP)",
          desc: "Download ZIP and let your AI agent extract and copy skills automatically.",
          installCmd: "# 1. Download: https://github.com/vinhnt21/research-kit/archive/refs/heads/main.zip\n# 2. Prompt your agent:\nExtract research-kit-main.zip and copy folders from skills/rk-* into your skills directory.",
          updateCmd: "Re-download the ZIP and prompt the agent to overwrite the skills directory with updated files.",
          removeCmd: "Prompt your agent: Delete all rk-* folders from your skills directory.",
        },
        {
          id: "manual",
          name: "Manual Git Clone & Directory Setup",
          desc: "Clone the repository and place skills directly into the agent directory.",
          installCmd: "git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/        # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/        # Claude Code\n# cp -r research-kit/skills/rk-* ~/.agents/skills/        # Antigravity\n# cp -r research-kit/skills/rk-* ~/.codex/skills/         # Codex",
          updateCmd: "cd research-kit && git pull\ncp -r skills/rk-* ~/.cursor/skills/",
          removeCmd: "rm -rf ~/.cursor/skills/rk-*",
        },
      ],
      healthCheckTitle: "Integrity Verification (Health Check)",
      healthCheckDesc: "Run the deterministic test suite to verify frontmatter limits, relative links, and reference files:",
      healthCheckCmd: "python3 scripts/check-suite.py",
      cacheWarning: "Important: Agents index skills into memory at session startup. Always restart your agent or start a new chat session after updating or removing skills.",
    },
    architecture: {
      title: "Multi-Paper Repository Architecture & Isolation",
      desc: "Scientific research frequently produces multiple drafts, sibling experiments, or exploratory ideas in a single lab repository. Without strict boundaries, AI agents trigger cross-contamination.",
      principles: [
        {
          title: "Active Paper Resolution Rule",
          desc: "The agent must declare the active paper from the prompt, current working directory, or local AGENTS.md before reading files or running experiments. If ambiguous, the agent must ask.",
        },
        {
          title: "Strict Evidence Boundary",
          desc: "Sibling drafts, uncommitted test scripts, or unpublished results in sister folders are NEVER valid evidence, baseline data, or citations for the active paper.",
        },
        {
          title: "Audited Read-Only Literature Shelf",
          desc: "Centralized literature/ folder is shared for universal reference in read-only mode. Every cited paper must be audited independently for the active manuscript.",
        },
      ],
      tree: `my-research-lab/                # Root Laboratory Repository
├── AGENTS.md                   # Global lab standards & coding rules
├── literature/                 # Shared literature (AUDITED READ-ONLY)
│   ├── references.bib          # Universal BibTeX citation registry
│   └── pdfs/                   # Downloaded source preprints and PDFs
│
├── papers/                     # Independent, Partitioned Paper Workspaces
│   ├── 2026-vqe-optimization/  # [Active Paper 1]
│   │   ├── AGENTS.md           # Active Paper Declaration (Scope, Questions, Hypotheses)
│   │   ├── src/                # Experimental code for Paper 1
│   │   ├── data/               # Dedicated raw data & independent rerun logs
│   │   ├── figures/            # Publication figures for Paper 1
│   │   └── manuscript/         # LaTeX / Markdown manuscript sources
│   │
│   └── 2026-routing-protocol/  # [Active Paper 2] - Completely isolated
│       ├── AGENTS.md           # Active Paper Declaration for Paper 2
│       ├── src/
│       ├── data/
│       ├── figures/
│       └── manuscript/
│
└── shared/                     # (Optional) Verified common math/plot utilities`,
    },
    coreSkills: {
      title: "Core Pipeline Skills (6 Stages)",
      desc: "The 6 procedural skills covering the complete scientific paper lifecycle from initial literature mapping to publication and dissemination:",
      items: [
        {
          id: "rk-survey",
          stage: "Stage 01",
          name: "Literature Survey & Provenance",
          duty: "Systematic literature search boundary, citation verification, retraction checking, and evidence mapping.",
          whenToUse: "Surveying prior work, verifying if citations actually exist, mapping claims across papers.",
          whenNotToUse: "Idea ranking, experimental protocol design, writing paper prose.",
          inputs: "Research keywords, problem statement, literature/references.bib.",
          outputs: "assets/search-record.md, assets/citation-checklist.md, Evidence Map.",
          gate: "Search boundary locked with stop rules. Load-bearing sources have verified DOIs. Zero hallucinated citations.",
          promptVi: "Gọi @rk-survey để khảo sát tài liệu về quantum repeater. Kiểm tra nguồn gốc và lập checklist trích dẫn cho 5 bài báo nền tảng.",
          promptEn: "Run @rk-survey to map recent literature on quantum repeaters. Complete a citation check on the top 5 baseline papers.",
          files: "references/search-boundary.md, citation-check.md, evidence-map.md",
        },
        {
          id: "rk-idea",
          stage: "Stage 02",
          name: "Hypothesis & Rival Falsification",
          duty: "Formulate research questions, build rival hypotheses matrix, specify falsification criteria, and audit cognitive bias.",
          whenToUse: "Turning a raw intuition into a falsifiable hypothesis, stress-testing against rival explanations.",
          whenNotToUse: "Searching literature, writing simulation code or benchmark scripts.",
          inputs: "Evidence map and research gaps from rk-survey.",
          outputs: "assets/hypothesis-record.md, assets/rival-matrix.md, Pursue / Kill decision log.",
          gate: "Falsification criteria specified before coding. Signed Pursue / Kill decision matrix.",
          promptVi: "Dùng @rk-idea để phản biện giả thuyết về thuật toán cắt tỉa mạng nơ-ron, lập ma trận đối thủ và chỉ rõ điều kiện bác bỏ.",
          promptEn: "Use @rk-idea to stress-test our hypothesis regarding neural network pruning against 3 rival explanations.",
          files: "references/framing.md, hypothesis-quality.md, rivals-and-falsification.md",
        },
        {
          id: "rk-method",
          stage: "Stage 03",
          name: "Methodology & Protocol Freeze",
          duty: "Experimental design, baseline controls, power and precision analysis, compute budget, and Protocol Freeze.",
          whenToUse: "Designing experimental protocols, determining sample size, freezing analysis plan to prevent p-hacking.",
          whenNotToUse: "Analyzing experimental output data, drafting manuscript prose.",
          inputs: "Accepted hypothesis from rk-idea.",
          outputs: "assets/method-plan.md (Frozen experimental protocol).",
          gate: "Protocol Freeze. Experimental variables, statistical tests, metrics, and stopping criteria locked before script execution.",
          promptVi: "Gọi @rk-method để thiết kế thí nghiệm benchmark so sánh, tính toán power analysis và đóng băng file method-plan.md.",
          promptEn: "Apply @rk-method to design the benchmark protocol for our routing algorithm. Calculate sample size and freeze protocol.",
          files: "references/design-choice.md, power-and-precision.md, feasibility-and-freeze.md",
        },
        {
          id: "rk-data",
          stage: "Stage 04",
          name: "Raw Data & Rerun Verification",
          duty: "Raw data inspection, statistical hypothesis testing, publication figures, anomaly diagnosis, and clean rerun check.",
          whenToUse: "Inspecting raw CSV/JSON logs, running t-tests/ANOVA/CI, reproducing figures directly from raw inputs.",
          whenNotToUse: "Altering the frozen protocol, drafting manuscript conclusions without reruns.",
          inputs: "Frozen method plan (method-plan.md) and raw data in data/.",
          outputs: "assets/analysis-record.md, clean rerun execution log, publication figures.",
          gate: "Mandatory fresh rerun check. No claim or figure accepted without verifiable rerun from raw data.",
          promptVi: "Dùng @rk-data kiểm tra phân phối dữ liệu thô tại data/run-01/, chạy kiểm định thống kê và thực hiện rerun độc lập.",
          promptEn: "Run @rk-data to inspect raw data in data/run-01/, test for statistical significance, and verify clean rerun reproducibility.",
          files: "references/inspect.md, test-choice.md, figures.md, anomalies-and-rerun.md",
        },
        {
          id: "rk-write",
          stage: "Stage 05",
          name: "Structured Manuscript Drafting",
          duty: "Structured academic paper authoring, 1 core idea per paragraph, claim-to-evidence alignment audit, formal rebuttal.",
          whenToUse: "Drafting Abstract, Intro, Methods, Results, Discussion; auditing claim-to-evidence parity; peer-review rebuttal.",
          whenNotToUse: "Recalculating statistics from raw data, building slide decks.",
          inputs: "assets/analysis-record.md, assets/method-plan.md, assets/search-record.md.",
          outputs: "manuscript/*.tex or *.md, assets/claim-evidence.md, formal author rebuttal.",
          gate: "100% claim-to-evidence audit. Every number, claim, and figure mapped to verified rerun artifacts or checked citations.",
          promptVi: "Gọi @rk-write để viết phần Kết quả (Section 4). Đảm bảo mỗi đoạn 1 ý chính và đối chiếu số liệu với analysis-record.md.",
          promptEn: "Use @rk-write to draft Section 4 (Results). Ensure each paragraph has 1 core idea and audit claims against analysis-record.md.",
          files: "references/claim-evidence.md, section-roles.md, paragraph-flow.md, review-and-response.md",
        },
        {
          id: "rk-report",
          stage: "Stage 06",
          name: "Dissemination & Reporting",
          duty: "Lab meeting debriefs, executive summaries, defense presentation outlines, and transparent stakeholder reporting.",
          whenToUse: "Weekly lab updates, milestone reports for grant directors, thesis defense outlines.",
          whenNotToUse: "Rendering TikZ diagrams, making unverified marketing claims.",
          inputs: "Completed manuscript draft, analysis record, or milestone outcomes.",
          outputs: "assets/report-record.md, executive briefing document.",
          gate: "Reporting gate strictly restricted to empirically verified results. Speculations must be explicitly labeled.",
          promptVi: "Dùng @rk-report lập báo cáo tóm tắt 2 trang cho buổi họp lab tuần này, tập trung vào kết quả thực nghiệm đã verify.",
          promptEn: "Use @rk-report to prepare a 2-page progress debrief for our weekly lab meeting covering validated results only.",
          files: "references/report-gate.md",
        },
      ],
    },
    domainSkills: {
      title: "Domain Specialist Extensions (4 Modules)",
      desc: "Domain-specific extensions reflecting specialized computational disciplines and scientific visualization:",
      items: [
        {
          id: "rk-quantum",
          domain: "Quantum Computing",
          duty: "Hamiltonian modeling, statevector/circuit simulation, variational algorithms (VQE, QAOA), quantum tomography.",
          invariant: "Local simulation default. Cloud QPU hardware execution strictly requires explicit budget authorization.",
          promptVi: "Dùng @rk-quantum mô phỏng mạch VQE cho phân tử H2 bằng Qiskit chạy cục bộ trên máy.",
          promptEn: "Use @rk-quantum to build a local statevector simulation of a 12-qubit Heisenberg Hamiltonian using Qiskit.",
          files: "references/model-checks.md, execution-boundary.md, assets/quantum-run-record.md",
        },
        {
          id: "rk-quantum-network",
          domain: "Quantum Networks",
          duty: "Entanglement distribution protocols, quantum memory repeaters, routing & scheduling algorithms, Bell fidelity bounds.",
          invariant: "Fidelity bounds verification & network protocol state validation before claiming routing throughput.",
          promptVi: "Gọi @rk-quantum-network mô phỏng quá trình entanglement swapping qua chuỗi 4 repeater và tính toán fidelity suy giảm.",
          promptEn: "Use @rk-quantum-network to simulate entanglement swapping across a 5-node linear repeater chain and compute fidelity.",
          files: "Self-contained protocol specification (SKILL.md)",
        },
        {
          id: "rk-ai",
          domain: "AI & Machine Learning",
          duty: "Strict train/val/test splits, data leakage detection, baseline sanity, reproducible seeds, and generative eval.",
          invariant: "Zero data leakage. Any transformation, scaling, or imputation must be fit strictly on train split only.",
          promptVi: "Dùng @rk-ai kiểm toán pipeline tiền xử lý để đảm bảo không bị data leakage giữa tập train/test và kiểm tra seed cố định.",
          promptEn: "Run @rk-ai to audit our data preprocessing pipeline for temporal leakage and verify fixed seed reproducibility.",
          files: "references/leakage-and-splits.md, evaluation.md, assets/ml-eval-record.md",
        },
        {
          id: "rk-academic-visualize",
          domain: "Scientific Visualization & Slides",
          duty: "Publication-grade LaTeX TikZ architecture diagrams, clean SVG/Mermaid flowcharts, anti-overlap arrow geometry, slide decks.",
          invariant: "Cognitive load filtering, max 2-bend orthogonal arrows, collision-free geometry, source-grounded slides.",
          promptVi: "Dùng @rk-academic-visualize để vẽ sơ đồ kiến trúc hệ thống bằng LaTeX TikZ chuẩn bài báo IEEE, đảm bảo mũi tên không đè chữ.",
          promptEn: "Use @rk-academic-visualize to generate a publication-grade LaTeX TikZ diagram with collision-free orthogonal arrows.",
          files: "references/illustration-guide.md, assets/presentation-templates",
        },
      ],
    },
    playbook: {
      title: "End-to-End Scientific Playbook",
      desc: "How a research team navigates the 6 stages sequentially with verifiable artifact transfers:",
      steps: [
        {
          phase: "Week 1",
          skill: "rk-survey",
          title: "Literature Grounding & Provenance",
          desc: "Screen papers, audit citations against retraction databases, lock search boundary, and produce assets/search-record.md.",
        },
        {
          phase: "Week 2",
          skill: "rk-idea",
          title: "Hypothesis Stress-Testing",
          desc: "Formulate core research question, construct rival hypothesis matrix, establish falsification rules, and produce assets/rival-matrix.md.",
        },
        {
          phase: "Week 3",
          skill: "rk-method",
          title: "Experimental Protocol Freeze",
          desc: "Define sample sizes, compute power analysis, specify metrics and baseline controls, and freeze assets/method-plan.md.",
        },
        {
          phase: "Week 4",
          skill: "rk-ai / rk-quantum + rk-data",
          title: "Execution & Clean Rerun Verification",
          desc: "Run models/simulations, inspect raw data, perform statistical hypothesis tests, and log fresh rerun verification in assets/analysis-record.md.",
        },
        {
          phase: "Week 5",
          skill: "rk-write",
          title: "Structured Manuscript Drafting",
          desc: "Draft sections using 1 core idea per paragraph, perform 100% claim-to-evidence audit, and produce assets/claim-evidence.md.",
        },
        {
          phase: "Week 6",
          skill: "rk-academic-visualize + rk-report",
          title: "Visualization & Dissemination",
          desc: "Render publication-grade TikZ architecture diagrams, build defense slides, and produce executive briefing in assets/report-record.md.",
        },
      ],
    },
    cheatsheet: {
      title: "Quick Decision Matrix & Prompt Cheatsheet",
      desc: "Find the exact skill and sample prompt for your current research task:",
      headers: ["Task / Objective", "Skill to Call", "Ready-to-Use Prompt Template"],
      rows: [
        {
          task: "Check if a paper is real or retracted",
          skill: "rk-survey",
          prompt: "@rk-survey audit citation pedigree for [DOI or Paper Title]",
        },
        {
          task: "Systematic literature search boundary",
          skill: "rk-survey",
          prompt: "@rk-survey map evidence and search boundaries for [Research Topic]",
        },
        {
          task: "Stress-test hypothesis against rivals",
          skill: "rk-idea",
          prompt: "@rk-idea evaluate hypothesis and build rival matrix for [Problem Statement]",
        },
        {
          task: "Design protocol & prevent p-hacking",
          skill: "rk-method",
          prompt: "@rk-method design benchmark protocol, calculate sample size, and freeze method-plan.md",
        },
        {
          task: "Statistical testing & clean rerun",
          skill: "rk-data",
          prompt: "@rk-data test statistical significance and run clean rerun from [data/raw-path]",
        },
        {
          task: "Draft manuscript section with evidence audit",
          skill: "rk-write",
          prompt: "@rk-write draft Section 4 (Results) with 1 core idea per paragraph and audit against analysis-record.md",
        },
        {
          task: "Rebuttal to peer reviewer comments",
          skill: "rk-write",
          prompt: "@rk-write draft point-by-point rebuttal to Reviewer 2 comment: [Paste comment]",
        },
        {
          task: "Weekly lab meeting progress briefing",
          skill: "rk-report",
          prompt: "@rk-report generate 2-page progress debrief from [paper-workspace]",
        },
        {
          task: "Local quantum circuit / VQE simulation",
          skill: "rk-quantum",
          prompt: "@rk-quantum run local statevector simulation of [Hamiltonian] with Qiskit",
        },
        {
          task: "Quantum network repeater routing",
          skill: "rk-quantum-network",
          prompt: "@rk-quantum-network evaluate entanglement distribution fidelity across repeater chain",
        },
        {
          task: "Audit ML pipeline for data leakage",
          skill: "rk-ai",
          prompt: "@rk-ai audit dataset preprocessing for train/test leakage and check fixed seed reproducibility",
        },
        {
          task: "Publication-grade TikZ architecture figure",
          skill: "rk-academic-visualize",
          prompt: "@rk-academic-visualize create LaTeX TikZ diagram with collision-free orthogonal arrows",
        },
      ],
    },
    antipatterns: {
      title: "Anti-Patterns & Critical Safeguards",
      desc: "Common pitfalls when using AI for scientific research and how Research Kit prevents them:",
      items: [
        {
          name: "Citation Hallucination",
          problem: "LLMs invent plausible-sounding author names, venues, and preprints that do not exist.",
          safeguard: "rk-survey enforces mandatory DOI verification and citation pedigree check. Unverified sources cannot be cited.",
        },
        {
          name: "Post-Hoc P-Hacking & HARKing",
          problem: "Hypothesizing After Results are Known (HARKing) and modifying metrics until p < 0.05.",
          safeguard: "rk-method requires a locked Protocol Freeze (method-plan.md) before experimental data analysis begins.",
        },
        {
          name: "Context Window Bloat",
          problem: "Catalogs with 160+ skills consume >14,000 standing tokens (>7% of context), causing context exhaustion.",
          safeguard: "Research Kit caps standing footprint under 1,000 tokens (<0.50%), freeing >99.5% of context for papers and raw data.",
        },
        {
          name: "Multi-Paper Cross-Contamination",
          problem: "Agent working on Paper A accidentally imports exploratory baseline numbers from Paper B in the same repo.",
          safeguard: "Active Paper Resolution via AGENTS.md strictly quarantines papers/<paper-id>/ workspaces.",
        },
      ],
    },
  },
  vi: {
    hero: {
      eyebrow: "CẨM NANG KỸ THUẬT & HƯỚNG DẪN VẬN HÀNH",
      title: "Tài Liệu Hướng Dẫn Research Kit",
      subtitle: "Cẩm nang hướng dẫn đầy đủ từ cài đặt, cập nhật, cách ly đa bài báo đến quy trình nghiên cứu thực nghiệm với 10 kỹ năng chuẩn hoá cho AI agent (Cursor, Claude Code, Codex, Antigravity). Nguồn Markdown nằm trong documents/.",
      stats: [
        { label: "Quy trình", value: "6 Giai đoạn lõi" },
        { label: "Mở rộng", value: "4 Chuyên ngành" },
        { label: "Chiếm dụng Context", value: "<0,50%" },
        { label: "Script chạy ngầm", value: "0 (chỉ Markdown)" },
      ],
    },
    nav: {
      lifecycle: "Cài đặt & Vòng đời",
      architecture: "Kiến trúc Đa Bài Báo",
      coreSkills: "6 Kỹ Năng Cốt Lõi",
      domainSkills: "4 Module Chuyên Ngành",
      playbook: "Kịch Bản Thực Chiến",
      cheatsheet: "Bảng Tra Cứu & Prompt",
      antipatterns: "Cạm Bẫy & Phòng Vệ",
    },
    lifecycle: {
      title: "Quản Trị Vòng Đời: Cài Đặt, Cập Nhật & Gỡ Bỏ",
      desc: "Toàn bộ kỹ năng Research Kit là quy trình viết bằng Markdown, tuân thủ quy chuẩn Agent Skills. Không có chương trình chạy ngầm, không script phụ thuộc.",
      methods: [
        {
          id: "skills-cli",
          name: "Skills CLI (Khuyên dùng từ Vercel Labs)",
          desc: "Trình quản lý kỹ năng tiêu chuẩn cho các AI coding agent với đầy đủ lệnh CRUD.",
          installCmd: "npx skills add vinhnt21/research-kit",
          updateCmd: "npx skills update            # Quét & cập nhật tất cả\nnpx skills update -y         # Tự động xác nhận (CI/auto)\nnpx skills update rk-survey  # Cập nhật riêng 1 skill",
          removeCmd: "npx skills remove            # Chọn skill cần gỡ bằng menu\nnpx skills remove rk-ai -y   # Gỡ bỏ trực tiếp 1 skill",
        },
        {
          id: "github-cli",
          name: "GitHub CLI (v2.90.0+)",
          desc: "Cài đặt trực tiếp vào cấu hình của Cursor, Claude Code, Codex, hoặc Antigravity.",
          installCmd: "gh skill install vinhnt21/research-kit --agent cursor\n# Tùy chọn: --agent claude-code | --agent codex | --agent antigravity",
          updateCmd: "gh skill update --dry-run    # Xem trước thay đổi\ngh skill update --all        # Cập nhật toàn bộ\ngh skill update rk-data      # Cập nhật riêng 1 skill",
          removeCmd: "# Lưu ý: gh skill chưa có lệnh remove chính thức (Issue #13706)\ngh skill list --json name,path  # 1. Xem đường dẫn cài đặt\nrm -rf <path_to_skill>          # 2. Xoá thư mục skill đó",
        },
        {
          id: "agent-assisted",
          name: "Cài Đặt Tự Động Qua Agent (File ZIP)",
          desc: "Tải file ZIP và ra lệnh cho AI agent tự động giải nén và sao chép.",
          installCmd: "# 1. Tải về: https://github.com/vinhnt21/research-kit/archive/refs/heads/main.zip\n# 2. Nhập lệnh cho Agent:\nGiải nén research-kit-main.zip và chép các thư mục skills/rk-* vào thư mục kỹ năng của bạn.",
          updateCmd: "Tải lại ZIP mới nhất và yêu cầu agent chép đè vào thư mục kỹ năng.",
          removeCmd: "Yêu cầu agent: Xoá toàn bộ các thư mục rk-* khỏi thư mục skills.",
        },
        {
          id: "manual",
          name: "Sao Chép Thủ Công Từ Git Clone",
          desc: "Clone repository và chép trực tiếp vào thư mục cấu hình của agent trên máy.",
          installCmd: "git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/        # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/        # Claude Code\n# cp -r research-kit/skills/rk-* ~/.agents/skills/        # Antigravity\n# cp -r research-kit/skills/rk-* ~/.codex/skills/         # Codex",
          updateCmd: "cd research-kit && git pull\ncp -r skills/rk-* ~/.cursor/skills/",
          removeCmd: "rm -rf ~/.cursor/skills/rk-*",
        },
      ],
      healthCheckTitle: "Kiểm Tra Tính Toàn Vẹn (Health Check)",
      healthCheckDesc: "Chạy bộ kiểm tra tự động để xác nhận tính toàn vẹn frontmatter và liên kết tham chiếu:",
      healthCheckCmd: "python3 scripts/check-suite.py",
      cacheWarning: "Lưu ý quan trọng: Agent nạp kỹ năng vào RAM khi khởi tạo phiên chat. Luôn mở phiên chat mới hoặc khởi động lại Agent sau khi cập nhật hoặc xoá skill.",
    },
    architecture: {
      title: "Kiến Trúc Repository Đa Bài Báo & Ranh Giới Cách Ly",
      desc: "Nghiên cứu khoa học thường duy trì nhiều bản thảo, thí nghiệm thăm dò trong cùng một repo. Nếu không cách ly chặt chẽ, AI agent rất dễ gây ô nhiễm chéo dữ liệu.",
      principles: [
        {
          title: "Quy tắc xác định bài báo hiện hành (Active Paper)",
          desc: "Agent phải xác định bài báo hiện hành từ prompt, thư mục làm việc, hoặc file AGENTS.md cục bộ trước khi đọc file hoặc chạy code. Nếu mơ hồ, agent bắt buộc phải hỏi lại.",
        },
        {
          title: "Ranh giới bằng chứng nghiêm ngặt",
          desc: "Bản thảo nháp, script thử nghiệm hay số liệu chưa công bố của bài báo bên cạnh TUYỆT ĐỐI KHÔNG ĐƯỢC dùng làm bằng chứng, baseline hay trích dẫn cho bài báo hiện tại.",
        },
        {
          title: "Kệ tài liệu dùng chung ở chế độ Chỉ Đọc",
          desc: "Thư mục literature/ dùng chung cho cả repo ở chế độ Read-Only. Mọi trích dẫn đưa vào bài báo đều phải được kiểm tra nguồn gốc độc lập.",
        },
      ],
      tree: `my-research-lab/                # Kho lưu trữ gốc của Lab
├── AGENTS.md                   # Quy ước chung toàn lab & chuẩn code
├── literature/                 # Thư viện tài liệu tham khảo (CHỈ ĐỌC)
│   ├── references.bib          # File BibTeX trích dẫn đã kiểm chứng
│   └── pdfs/                   # File PDF tài liệu gốc và preprint
│
├── papers/                     # Không gian riêng cho từng bài báo
│   ├── 2026-vqe-optimization/  # [Bài báo đang làm 1]
│   │   ├── AGENTS.md           # Tuyên bố Active Paper (Mục tiêu, câu hỏi)
│   │   ├── src/                # Mã nguồn thí nghiệm riêng cho bài 1
│   │   ├── data/               # Dữ liệu thô & log rerun riêng cho bài 1
│   │   ├── figures/            # Hình vẽ xuất bản riêng cho bài 1
│   │   └── manuscript/         # Bản thảo bài báo (LaTeX / Markdown)
│   │
│   └── 2026-routing-protocol/  # [Bài báo đang làm 2] - Cách ly 100%
│       ├── AGENTS.md           # Tuyên bố Active Paper cho bài 2
│       ├── src/
│       ├── data/
│       ├── figures/
│       └── manuscript/
│
└── shared/                     # (Tùy chọn) Thư viện toán chung hoặc tiện ích vẽ`,
    },
    coreSkills: {
      title: "6 Kỹ Năng Cốt Lõi (Theo Vòng Đời Nghiên Cứu)",
      desc: "6 kỹ năng vận hành bao quát toàn bộ vòng đời của một bài báo khoa học từ khảo sát tài liệu đến công bố:",
      items: [
        {
          id: "rk-survey",
          stage: "Giai đoạn 01",
          name: "Khảo Sát Tài Liệu & Thẩm Định Nguồn Gốc",
          duty: "Xác định ranh giới tìm kiếm có hệ thống, kiểm tra trích dẫn, kiểm tra bài bị rút (retraction) và lập bản đồ chứng cứ.",
          whenToUse: "Bắt đầu tìm hiểu chủ đề mới, kiểm tra bài báo có thật không, lập bảng so sánh các công trình đi trước.",
          whenNotToUse: "Xếp hạng ý tưởng, thiết kế thí nghiệm, viết bản thảo bài báo.",
          inputs: "Từ khóa nghiên cứu, câu hỏi định hướng, literature/references.bib.",
          outputs: "assets/search-record.md, assets/citation-checklist.md, Bản đồ chứng cứ.",
          gate: "Khóa ranh giới tìm kiếm với quy tắc dừng rõ ràng. 100% trích dẫn phải có DOI/venue thật. Không trích dẫn ảo.",
          promptVi: "Gọi @rk-survey để khảo sát tài liệu về quantum repeater. Kiểm tra nguồn gốc và lập checklist trích dẫn cho 5 bài báo nền tảng.",
          promptEn: "Run @rk-survey to map recent literature on quantum repeaters. Complete a citation check on the top 5 baseline papers.",
          files: "references/search-boundary.md, citation-check.md, evidence-map.md",
        },
        {
          id: "rk-idea",
          stage: "Giai đoạn 02",
          name: "Xây Dựng Giả Thuyết & Đối Lập Bác Bỏ",
          duty: "Định hình câu hỏi nghiên cứu, lập ma trận giả thuyết đối thủ, xác định điều kiện bác bỏ và rà soát thiên kiến nhận thức.",
          whenToUse: "Biến trực giác thô thành giả thuyết kiểm chứng được, phản biện với các cách giải thích cạnh tranh.",
          whenNotToUse: "Tìm kiếm tài liệu, viết mã nguồn thí nghiệm hoặc chạy benchmark.",
          inputs: "Bản đồ chứng cứ và khoảng trống nghiên cứu từ rk-survey.",
          outputs: "assets/hypothesis-record.md, assets/rival-matrix.md, Biên bản Pursue / Kill.",
          gate: "Chỉ rõ điều kiện bác bỏ trước khi viết code. Ma trận quyết định Pursue / Kill phải được người nghiên cứu duyệt.",
          promptVi: "Dùng @rk-idea để phản biện giả thuyết về thuật toán cắt tỉa mạng nơ-ron, lập ma trận đối thủ và chỉ rõ điều kiện bác bỏ.",
          promptEn: "Use @rk-idea to stress-test our hypothesis regarding neural network pruning against 3 rival explanations.",
          files: "references/framing.md, hypothesis-quality.md, rivals-and-falsification.md",
        },
        {
          id: "rk-method",
          stage: "Giai đoạn 03",
          name: "Phương Pháp Luận & Đóng Băng Giao Thức",
          duty: "Thiết kế thực nghiệm, lựa chọn baseline đối chứng, phân tích power analysis, tính compute budget và Đóng Băng Giao Thức.",
          whenToUse: "Thiết kế thí nghiệm, tính cỡ mẫu tối thiểu, khóa kế hoạch phân tích để chống p-hacking.",
          whenNotToUse: "Phân tích số liệu kết quả, viết bản thảo bài báo.",
          inputs: "Giả thuyết đã nghiệm thu từ rk-idea.",
          outputs: "assets/method-plan.md (Kế hoạch thí nghiệm đã đóng băng).",
          gate: "Đóng băng giao thức (Protocol Freeze). Biến số, thước đo, phép kiểm định phải được chốt cứng trước khi chạy script.",
          promptVi: "Gọi @rk-method để thiết kế thí nghiệm benchmark so sánh, tính toán power analysis và đóng băng file method-plan.md.",
          promptEn: "Apply @rk-method to design the benchmark protocol for our routing algorithm. Calculate sample size and freeze protocol.",
          files: "references/design-choice.md, power-and-precision.md, feasibility-and-freeze.md",
        },
        {
          id: "rk-data",
          stage: "Giai đoạn 04",
          name: "Dữ Liệu Thô & Kiểm Chứng Chạy Lại Độc Lập",
          duty: "Kiểm tra dữ liệu thô, kiểm định thống kê, vẽ biểu đồ xuất bản, chẩn đoán ngoại lai và chạy lại độc lập (fresh rerun).",
          whenToUse: "Kiểm tra phân phối file log CSV/JSON, chạy t-test/ANOVA/CI, tái tạo lại toàn bộ số liệu trực tiếp từ dữ liệu thô.",
          whenNotToUse: "Tự ý sửa đổi phương pháp đã đóng băng, viết kết luận bài báo khi chưa rerun.",
          inputs: "Kế hoạch phương pháp đã đóng băng (method-plan.md) và dữ liệu thô trong data/.",
          outputs: "assets/analysis-record.md, log chạy lại độc lập, biểu đồ xuất bản.",
          gate: "Bắt buộc kiểm chứng chạy lại độc lập. Không chấp nhận bất kỳ con số hay biểu đồ nào nếu không thể tái tạo từ dữ liệu thô.",
          promptVi: "Dùng @rk-data kiểm tra phân phối dữ liệu thô tại data/run-01/, chạy kiểm định thống kê và thực hiện rerun độc lập.",
          promptEn: "Run @rk-data to inspect raw data in data/run-01/, test for statistical significance, and verify clean rerun reproducibility.",
          files: "references/inspect.md, test-choice.md, figures.md, anomalies-and-rerun.md",
        },
        {
          id: "rk-write",
          stage: "Giai đoạn 05",
          name: "Soạn Thảo Bản Thảo Cấu Trúc",
          duty: "Soạn thảo bài báo theo kỷ luật 1 ý/đoạn, kiểm toán 100% số liệu so với bằng chứng, soạn thảo thư phản hồi reviewer.",
          whenToUse: "Viết Abstract, Intro, Methods, Results, Discussion; đối soát số liệu; viết rebuttal cho peer review.",
          whenNotToUse: "Tính toán lại số liệu thống kê, làm slide thuyết trình.",
          inputs: "assets/analysis-record.md, assets/method-plan.md, assets/search-record.md.",
          outputs: "manuscript/*.tex hoặc *.md, assets/claim-evidence.md, thư rebuttal.",
          gate: "Kiểm toán 100% bằng chứng. Mọi khẳng định và con số trong bài báo phải map trực tiếp về file rerun hoặc tài liệu trích dẫn thật.",
          promptVi: "Gọi @rk-write để viết phần Kết quả (Section 4). Đảm bảo mỗi đoạn 1 ý chính và đối chiếu số liệu với analysis-record.md.",
          promptEn: "Use @rk-write to draft Section 4 (Results). Ensure each paragraph has 1 core idea and audit claims against analysis-record.md.",
          files: "references/claim-evidence.md, section-roles.md, paragraph-flow.md, review-and-response.md",
        },
        {
          id: "rk-report",
          stage: "Giai đoạn 06",
          name: "Báo Cáo Định Kỳ & Phổ Biến Kết Quả",
          duty: "Soạn báo cáo tiến độ lab, tóm tắt điều hành, dàn ý thuyết trình bảo vệ luận án, báo cáo các mốc nghiên cứu.",
          whenToUse: "Báo cáo tiến độ tuần cho lab, tóm tắt đóng góp cho quỹ tài trợ, dàn ý bài thuyết trình hội thảo.",
          whenNotToUse: "Vẽ hình TikZ phức tạp, đưa ra nhận định tiếp thị chưa kiểm chứng.",
          inputs: "Bản thảo bài báo, bản ghi phân tích kết quả, hoặc các mốc tiến độ.",
          outputs: "assets/report-record.md, tài liệu tóm tắt điều hành.",
          gate: "Cổng báo cáo chỉ chấp nhận kết quả đã kiểm chứng thực nghiệm. Mọi suy đoán phải được dán nhãn phân biệt.",
          promptVi: "Dùng @rk-report lập báo cáo tóm tắt 2 trang cho buổi họp lab tuần này, tập trung vào kết quả thực nghiệm đã verify.",
          promptEn: "Use @rk-report to prepare a 2-page progress debrief for our weekly lab meeting covering validated results only.",
          files: "references/report-gate.md",
        },
      ],
    },
    domainSkills: {
      title: "4 Module Chuyên Ngành Mở Rộng",
      desc: "Các module chuyên sâu phục vụ nghiên cứu tính toán và minh họa khoa học:",
      items: [
        {
          id: "rk-quantum",
          domain: "Điện Toán Lượng Tử",
          duty: "Mô hình Hamiltonian, mô phỏng mạch lượng tử, thuật toán biến thiên (VQE, QAOA), tomography trạng thái lượng tử.",
          invariant: "Mặc định mô phỏng cục bộ. Chạy chip QPU vật lý trên đám mây bắt buộc phải có phê duyệt chi phí rõ ràng.",
          promptVi: "Dùng @rk-quantum mô phỏng mạch VQE cho phân tử H2 bằng Qiskit chạy cục bộ trên máy.",
          promptEn: "Use @rk-quantum to build a local statevector simulation of a 12-qubit Heisenberg Hamiltonian using Qiskit.",
          files: "references/model-checks.md, execution-boundary.md, assets/quantum-run-record.md",
        },
        {
          id: "rk-quantum-network",
          domain: "Mạng Lượng Tử",
          duty: "Giao thức phân phối vướng víu, bộ nhớ repeater, định tuyến và lập lịch mạng lượng tử, kiểm tra ngưỡng fidelity.",
          invariant: "Xác minh giới hạn fidelity và trạng thái giao thức mạng trước khi đưa ra nhận định về thông lượng.",
          promptVi: "Gọi @rk-quantum-network mô phỏng quá trình entanglement swapping qua chuỗi 4 repeater và tính toán fidelity suy giảm.",
          promptEn: "Use @rk-quantum-network to simulate entanglement swapping across a 5-node linear repeater chain and compute fidelity.",
          files: "Quy chuẩn giao thức độc lập (SKILL.md)",
        },
        {
          id: "rk-ai",
          domain: "Trí Tuệ Nhân Tạo & Học Máy",
          duty: "Phân tách nghiêm ngặt Train/Val/Test, kiểm toán rò rỉ dữ liệu (leakage), cố định seed ngẫu nhiên, kiểm chuẩn công bằng.",
          invariant: "Tuyệt đối không rò rỉ dữ liệu. Mọi phép chuẩn hoá dữ liệu chỉ được fit trên tập train duy nhất.",
          promptVi: "Dùng @rk-ai kiểm toán pipeline tiền xử lý để đảm bảo không bị data leakage giữa tập train/test và kiểm tra seed cố định.",
          promptEn: "Run @rk-ai to audit our data preprocessing pipeline for temporal leakage and verify fixed seed reproducibility.",
          files: "references/leakage-and-splits.md, evaluation.md, assets/ml-eval-record.md",
        },
        {
          id: "rk-academic-visualize",
          domain: "Minh Họa Khoa Học & Slide",
          duty: "Vẽ sơ đồ kiến trúc bài báo bằng LaTeX TikZ chuẩn IEEE/ACM, lưu đồ SVG/Mermaid, hình học mũi tên không đè chữ, slide báo cáo.",
          invariant: "Lọc tải nhận thức, tối đa 2 khúc gấp trên mũi tên, hình học chống đè lấn, nội dung slide bám sát bài báo.",
          promptVi: "Dùng @rk-academic-visualize để vẽ sơ đồ kiến trúc hệ thống bằng LaTeX TikZ chuẩn bài báo IEEE, đảm bảo mũi tên không đè chữ.",
          promptEn: "Use @rk-academic-visualize to generate a publication-grade LaTeX TikZ diagram with collision-free orthogonal arrows.",
          files: "references/illustration-guide.md, assets/presentation-templates",
        },
      ],
    },
    playbook: {
      title: "Kịch Bản Nghiên Cứu Thực Chiến Toàn Diện",
      desc: "Quy trình 6 tuần chuyển giao hiện vật rõ ràng từ ý tưởng đến bài báo hoàn chỉnh:",
      steps: [
        {
          phase: "Tuần 1",
          skill: "rk-survey",
          title: "Khảo Sát & Thẩm Định Nguồn Gốc",
          desc: "Lọc bài báo, kiểm tra DOI thật qua cơ sở dữ liệu, khóa ranh giới tìm kiếm và xuất file assets/search-record.md.",
        },
        {
          phase: "Tuần 2",
          skill: "rk-idea",
          title: "Phản Biện Ý Tưởng & Giả Thuyết",
          desc: "Định hình câu hỏi nghiên cứu, lập ma trận giả thuyết đối thủ, chỉ rõ điều kiện bác bỏ và xuất assets/rival-matrix.md.",
        },
        {
          phase: "Tuần 3",
          skill: "rk-method",
          title: "Đóng Băng Giao Thức Thí Nghiệm",
          desc: "Tính cỡ mẫu (power analysis), chốt thước đo, baseline so sánh và khóa file assets/method-plan.md trước khi chạy máy.",
        },
        {
          phase: "Tuần 4",
          skill: "rk-ai / rk-quantum + rk-data",
          title: "Chạy Thực Nghiệm & Rerun Độc Lập",
          desc: "Chạy mô hình/mô phỏng, kiểm định thống kê và ghi nhận kết quả chạy lại sạch từ dữ liệu thô vào assets/analysis-record.md.",
        },
        {
          phase: "Tuần 5",
          skill: "rk-write",
          title: "Soạn Thảo Bản Thảo Cấu Trúc",
          desc: "Viết bài báo theo nguyên tắc 1 ý/đoạn, kiểm toán 100% tuyên bố so với bằng chứng và xuất assets/claim-evidence.md.",
        },
        {
          phase: "Tuần 6",
          skill: "rk-academic-visualize + rk-report",
          title: "Minh Họa & Báo Cáo Bảo Vệ",
          desc: "Vẽ sơ đồ kiến trúc bằng LaTeX TikZ, dựng slide báo cáo và lập bản tóm tắt điều hành trong assets/report-record.md.",
        },
      ],
    },
    cheatsheet: {
      title: "Bảng Tra Cứu Nhanh & Mẫu Prompt Thực Chiến",
      desc: "Tra cứu kỹ năng tương ứng với vấn đề bạn đang giải quyết và câu lệnh mẫu copy được ngay:",
      headers: ["Mục Tiêu / Nhiệm Vụ", "Kỹ Năng Cần Gọi", "Mẫu Câu Lệnh Thực Chiến"],
      rows: [
        {
          task: "Kiểm tra bài báo có thật không, có bị rút không",
          skill: "rk-survey",
          prompt: "@rk-survey kiểm tra nguồn gốc và DOI cho bài báo [Tên bài/DOI]",
        },
        {
          task: "Khảo sát tài liệu có hệ thống",
          skill: "rk-survey",
          prompt: "@rk-survey lập bản đồ chứng cứ và xác định ranh giới tìm kiếm về [Chủ đề]",
        },
        {
          task: "Phản biện giả thuyết với các giải thích đối thủ",
          skill: "rk-idea",
          prompt: "@rk-idea đánh giá giả thuyết và lập ma trận đối thủ cho bài toán [Vấn đề]",
        },
        {
          task: "Thiết kế thí nghiệm và chống p-hacking",
          skill: "rk-method",
          prompt: "@rk-method thiết kế benchmark và đóng băng giao thức cho mô hình [Tên]",
        },
        {
          task: "Kiểm định thống kê & rerun từ dữ liệu thô",
          skill: "rk-data",
          prompt: "@rk-data kiểm định thống kê và chạy rerun độc lập từ thư mục [data/raw-path]",
        },
        {
          task: "Viết phần bài báo kèm kiểm toán số liệu",
          skill: "rk-write",
          prompt: "@rk-write viết Section 4 (Kết quả) theo nguyên tắc 1 ý/đoạn, đối chiếu với analysis-record.md",
        },
        {
          task: "Soạn thư phản hồi phản biện (Rebuttal)",
          skill: "rk-write",
          prompt: "@rk-write soạn phản hồi từng điểm cho nhận xét của Reviewer 2: [Nội dung nhận xét]",
        },
        {
          task: "Báo cáo tiến độ tuần cho buổi họp Lab",
          skill: "rk-report",
          prompt: "@rk-report lập tóm tắt tiến độ 2 trang dựa trên các kết quả đã kiểm chứng",
        },
        {
          task: "Mô phỏng thuật toán lượng tử VQE cục bộ",
          skill: "rk-quantum",
          prompt: "@rk-quantum mô phỏng cục bộ thuật toán VQE cho Hamiltonian [Công thức] bằng Qiskit",
        },
        {
          task: "Mô phỏng định tuyến mạng lượng tử repeater",
          skill: "rk-quantum-network",
          prompt: "@rk-quantum-network đánh giá fidelity phân phối vướng víu qua chuỗi repeater",
        },
        {
          task: "Kiểm tra rò rỉ dữ liệu học máy (Data leakage)",
          skill: "rk-ai",
          prompt: "@rk-ai kiểm toán pipeline tiền xử lý để phát hiện data leakage train/test",
        },
        {
          task: "Vẽ sơ đồ kiến trúc bài báo chuẩn IEEE/ACM",
          skill: "rk-academic-visualize",
          prompt: "@rk-academic-visualize vẽ sơ đồ khối hệ thống bằng LaTeX TikZ không đè mũi tên",
        },
      ],
    },
    antipatterns: {
      title: "Các Cạm Bẫy (Anti-Patterns) & Cơ Chế Phòng Vệ",
      desc: "Những sai lầm kinh điển khi dùng AI làm khoa học và cách Research Kit ngăn ngừa:",
      items: [
        {
          name: "Bịa đặt trích dẫn (Citation Hallucination)",
          problem: "Mô hình ngôn ngữ tự động bịa ra tên tác giả, tên tạp chí nghe rất thuyết phục nhưng không có thật.",
          safeguard: "rk-survey bắt buộc kiểm tra mã định danh DOI thật. Tài liệu không truy xuất được bản gốc không được đưa vào bài báo.",
        },
        {
          name: "Thêu dệt giả thuyết sau khi có số liệu (P-Hacking & HARKing)",
          problem: "Thử nghiệm nhiều thước đo cho đến khi đạt p < 0.05 rồi mới quay lại viết giả thuyết như thể mình đã đoán trước.",
          safeguard: "rk-method áp dụng cơ chế Đóng băng giao thức (Protocol Freeze) với file method-plan.md trước khi chạy thực nghiệm.",
        },
        {
          name: "Quá tải bộ nhớ thường trực (Context Bloat)",
          problem: "Các bộ kỹ năng khổng lồ (>160 kỹ năng) chiếm dụng hơn 14.000 token (>7% ngữ cảnh) làm loãng sự tập trung của AI.",
          safeguard: "Research Kit giới hạn dưới 1.000 token (<0,50%), dành trọn vẹn hơn 99,5% không gian cho dữ liệu thô, bài báo gốc và mã nguồn.",
        },
        {
          name: "Ô nhiễm chéo giữa các bài báo (Cross-Contamination)",
          problem: "Agent làm việc trên bài A nhưng vô tình lấy số liệu thử nghiệm của bài B trong cùng một repository.",
          safeguard: "Cơ chế Active Paper Declaration qua AGENTS.md cách ly hoàn toàn dữ liệu và bản thảo giữa các công trình.",
        },
      ],
    },
  },
};
