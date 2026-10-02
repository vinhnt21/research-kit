export const content = {
  en: {
    nav: {
      intro: 'Overview',
      advantages: 'Principles',
      roadmap: 'Roadmap',
      docs: 'Docs',
      install: 'Install',
      faq: 'FAQ',
      starGitHub: 'GitHub Star',
      toggleTheme: 'Toggle Theme',
      menu: 'Menu',
      close: 'Close',
    },
    figureViewer: {
      zoom: 'Zoom in',
      fullscreen: 'Fullscreen',
      fit: 'Fit',
      readable: 'Scroll (100%)',
      scrollHint: '← Swipe horizontally to explore',
      tapToZoom: 'Tap figure to expand',
      openOriginal: 'Open vector SVG',
      resetZoom: 'Reset',
      close: 'Close',
    },
    roadmap: {
      eyebrow: 'DEVELOPMENT ROADMAP',
      title: 'Why not use the existing skill sets?',
      subtitle:
        'A direct comparison of how humans and agents work when skill choices multiply—and what changes when the workflow is organized around research.',
      figure: {
        src: '/figures/human-agent-pipeline-en.svg',
        alt: 'Comparison of two collaborative research pipelines: Pipeline 1 (a large free skill collection, over 150 skills, makes the agent pick the wrong skill and produces results that are hard to check) vs Pipeline 2 (Research Kit with 10 stage-based skills keeps execution inside the current stage and makes review faster).',
        label: 'Figure 01',
        caption:
          'Large free skill collections (over 150 skills) stall at skill selection and overload verification. Research Kit splits 10 skills by research stage, so the agent stays in scope and the researcher can check the result and decide quickly.',
      },
      explanation:
        'The problem is not that the agent lacks capability. The problem is the number of routing decisions placed between the researcher and the core task. With too many skills, the agent struggles to choose a path and the researcher struggles to understand what the system is doing. Research Kit reduces the number of paths, gives the agent bounded support tasks, and keeps research questions, methods, evidence checks, and conclusions under human control.',
      timelineEyebrow: 'FROM FRICTION TO FOCUS',
      timelineTitle: 'One path, clear development milestones',
      timelineSubtitle:
        'The roadmap moves directly from observed friction to a lean core, then deepens the research capabilities that matter.',
      sequenceLabel: 'Research Kit development journey',
      milestones: [
        {
          number: '01',
          tone: 'friction',
          phase: 'Experience',
          title: 'Use existing free skill collections',
          description:
            'Apply large, freely shared skill collections to real research work and observe how humans and agents coordinate through them.',
        },
        {
          number: '02',
          tone: 'friction',
          phase: 'Friction',
          title: 'See both sides become confused',
          description:
            'The agent faces overlapping routes; the researcher must learn and supervise too many layers before doing the core task.',
        },
        {
          number: '03',
          tone: 'core',
          phase: 'Distillation',
          title: 'Read, compare, and remove duplication',
          description:
            'Keep the research gates that matter; remove overlapping ownership, routing, and instructions.',
        },
        {
          number: '04',
          tone: 'core',
          phase: 'Research Kit today',
          title: 'Build a lean research core',
          description:
            'Give each research stage one clear path while the researcher retains control of scientific decisions.',
        },
        {
          number: '05',
          tone: 'future',
          phase: 'Next',
          title: 'Strengthen method foundations',
          description:
            'Deepen research design, method choice, power and precision, bias, and validity.',
        },
        {
          number: '06',
          tone: 'future',
          phase: 'Next',
          title: 'Add statistical reasoning',
          description:
            'Clarify test selection, assumptions, effect sizes, uncertainty, and interpretation.',
        },
        {
          number: '07',
          tone: 'future',
          phase: 'Continuous',
          title: 'Tighten verification and reruns',
          description:
            'Improve provenance, anomaly handling, clean reruns, and claim-to-evidence checks.',
        },
        {
          number: '…',
          tone: 'future',
          phase: 'Open-ended',
          title: 'Add only what improves the research',
          description:
            'A new technique enters the core only when it adds research depth without adding unnecessary choices or weakening human control.',
        },
      ],
      explore: 'Explore the current skill set',
    },
    hero: {
      badge: 'Open Source • Lean Research Workflows',
      badgeShort: 'Open Source',
      title: 'A Lean Research Workflow for AI Agents',
      subtitle:
        'Research Kit organizes AI-assisted research into 6 core stages and 4 domain modules. The workflow verifies sources to keep fabricated references out of the literature record, supports research-question and method development, and guides data processing from raw inputs to reported results. Scientific decisions remain with researchers.',
      installLabel: 'Install the 10 skills with one command:',
      copied: 'Copied!',
      copyBtn: 'Copy',
      starCallout:
        'Support Research Kit with a Star on GitHub and help sustain open research tooling.',
      starCalloutLink: 'Support with a Star',
      altInstallPrompt: 'Or install via GitHub CLI:',
      zipNotice: 'A graphical installation path is also available.',
      zipLinkText: 'Download the ZIP for agent-assisted installation',
      supportedAgents: 'Supported agent environments:',
      stats: [
        { label: 'Context Footprint', value: '<0.50%', sub: '<1,000 persistent tokens' },
        { label: 'Core Workflow', value: '6 Stages', sub: '+ 4 domain modules' },
        { label: 'Bundled Runtime', value: '0 Scripts', sub: 'Markdown-based SOPs' },
        { label: 'License', value: 'Apache-2.0', sub: 'Free and open source' },
      ],
    },
    lifecycle: {
      eyebrow: 'EMPIRICAL WORKFLOW',
      heading: 'A Six-Stage Scientific Research Lifecycle',
      subtitle:
        'Each stage defines its scope, working artifacts, and empirical verification gate—from source verification and method planning to data processing and clean reruns. AI supports execution within those boundaries; researchers retain control of scientific decisions.',
      figureLabel: 'Figure 01',
      figureTitle: '6-Stage Core Lifecycle & 4 Pluggable Domain Extensions',
      figureCaption:
        'Structured flow from literature survey to final reporting with empirical quality gates and four pluggable specialist modules.',
      coreTitle: 'Part 1: 6 Core Workflow Stages',
      coreSubtitle:
        'Source verification, research-method design, data processing, writing, and reporting in one sequential workflow:',
      domainTitle: 'Part 2: 4 Domain Modules',
      domainSubtitle: 'Additional guidance for computational research and academic presentation:',
      skills: [
        {
          id: 'rk-survey',
          iconKey: 'search',
          stage: 'Stage 01',
          name: 'Literature Survey & Provenance',
          duty: 'Systematic literature search, evidence mapping, citation pedigree audit, and knowledge gap discovery.',
          gate: 'Recorded search boundary and citation verification checklist.',
          files: 'references/search-boundary.md, citation-check.md, assets/search-record.md',
        },
        {
          id: 'rk-idea',
          iconKey: 'lightbulb',
          stage: 'Stage 02',
          name: 'Hypothesis & Rival Falsification',
          duty: 'Formulate research questions, build rival hypotheses matrix, and specify falsification criteria.',
          gate: 'Go / No-Go decision gate before implementation and compute allocation.',
          files: 'references/framing.md, rivals-and-falsification.md, assets/rival-matrix.md',
        },
        {
          id: 'rk-method',
          iconKey: 'flask',
          stage: 'Stage 03',
          name: 'Methodology & Protocol Freeze',
          duty: 'Experimental design, baseline controls, power & precision analysis, run budget calculation.',
          gate: 'Protocol recorded before analysis to limit post-hoc selection and p-hacking.',
          files: 'references/design-choice.md, power-and-precision.md, assets/method-plan.md',
        },
        {
          id: 'rk-data',
          iconKey: 'barChart',
          stage: 'Stage 04',
          name: 'Raw Data & Rerun Verification',
          duty: 'Raw data inspection, statistical hypothesis testing, publication figures, and anomaly diagnosis.',
          gate: 'Clean rerun from raw data before reporting scientific findings.',
          files: 'references/inspect.md, test-choice.md, figures.md, assets/analysis-record.md',
        },
        {
          id: 'rk-write',
          iconKey: 'fileText',
          stage: 'Stage 05',
          name: 'Structured Manuscript Drafting',
          duty: 'Academic paper authoring, one core idea per paragraph, formal rebuttal and reviewer response.',
          gate: 'Claim–evidence alignment review before submission.',
          files: 'references/claim-evidence.md, section-roles.md, paragraph-flow.md',
        },
        {
          id: 'rk-report',
          iconKey: 'share2',
          stage: 'Stage 06',
          name: 'Dissemination & Reporting',
          duty: 'Progress debriefs, executive summaries, defense slides, and transparent stakeholder reporting.',
          gate: 'Reporting gate limited to verified empirical results.',
          files: 'references/report-gate.md, assets/report-record.md',
        },
      ],
      domains: [
        {
          id: 'rk-quantum',
          iconKey: 'cpu',
          domain: 'Quantum Computing',
          duty: 'Local Hamiltonian & circuit simulation, VQE/QAOA variational algorithms.',
          gate: 'Defaults to safe local simulation; QPU hardware execution requires explicit budget authorization.',
        },
        {
          id: 'rk-quantum-network',
          iconKey: 'network',
          domain: 'Quantum Networks',
          duty: 'Entanglement distribution, quantum memory repeaters, routing & scheduling protocols.',
          gate: 'Fidelity bounds verification & network protocol state validation.',
        },
        {
          id: 'rk-ai',
          iconKey: 'brain',
          domain: 'AI & Machine Learning',
          duty: 'Strict train/val/test splits, data leakage detection, baseline sanity, and reproducible seeds.',
          gate: 'Leakage prevention gate & deterministic seed check.',
        },
        {
          id: 'rk-academic-visualize',
          iconKey: 'presentation',
          domain: 'Scientific Visualization & Slides',
          duty: 'Publication-grade illustrations (LaTeX TikZ, Mermaid, SVGs) with anti-overlap arrow geometry and source-grounded slide decks.',
          gate: 'Cognitive load filtering, arrow clearance check & slide structure audit.',
        },
      ],
    },
    pillars: {
      eyebrow: 'DESIGN PRINCIPLES',
      heading: 'Lean, Research-Centered Design',
      subtitle:
        'The workflow keeps persistent instructions small, assigns AI bounded support tasks, and reserves scientific judgment for researchers.',
      cards: [
        {
          iconKey: 'zap',
          title: 'Small Persistent Footprint',
          desc: 'The 10 skills use fewer than 1,000 persistent tokens, or less than 0.50% of a 200k context window. The remaining context stays available for literature, data, methods, and analysis.',
        },
        {
          iconKey: 'shield',
          title: 'Literature, Method, and Data Verification',
          desc: 'Search boundaries and citation checks keep fabricated references out of the literature record. Rival-hypothesis matrices and recorded protocols support method development; raw-data inspection and clean reruns support data processing and result verification.',
        },
        {
          iconKey: 'layers',
          title: 'Paper-Level Evidence Boundaries',
          desc: 'Active-paper resolution separates the evidence, drafts, and analysis associated with concurrent papers in one repository. Shared literature remains read-only and citations are checked for each manuscript.',
        },
        {
          iconKey: 'unlock',
          title: 'Portable Markdown Procedures',
          desc: 'The skills are standard operating procedures written in Markdown. They add no bundled runtime scripts, automatic Git operations, or platform-specific dependencies; code, data, and scientific decisions remain under researcher control.',
        },
      ],
    },
    context: {
      eyebrow: 'CONTEXT FOOTPRINT',
      heading: 'Keep Persistent Instructions Proportional to the Research Task',
      subtitle:
        'Persistent skill metadata occupies part of the model context. A smaller footprint leaves more room for source material, empirical data, and the current research question.',
      figureLabel: 'Figure 03',
      figureTitle: 'Permanent Context Window Footprint Benchmark',
      figureCaption:
        'Measured persistent context consumption: 163 generic skills consume 7.12% (~14,246 tokens) vs Research Kit consuming <0.50% (~1,000 tokens) in a 200k context window.',
      competitorBadge: 'Too many skills',
      competitorTitle: 'Scientific Agent Skills (v2.65.0)',
      competitorTokens: '14,246 Tokens',
      competitorPercent: '7.12% of 200k Window',
      competitorDesc:
        'A broad collection with 163 skills, 105 Python scripts, and 29 credential variables, designed to cover many agent workflows.',
      kitBadge: 'Lean workflow',
      kitTitle: 'Research Kit (Lean Profile)',
      kitTokens: '<1,000 Tokens',
      kitPercent: '<0.50% of 200k Window',
      kitDesc:
        'A focused collection of 10 skills: 6 sequential research stages and 4 domain modules, implemented as Markdown procedures without bundled runtime scripts.',
      savingsHeadline:
        'The measured persistent-footprint difference is greater than 13,000 tokens.',
    },
    comparison: {
      eyebrow: 'STRUCTURAL COMPARISON',
      heading: 'Three Approaches to Agent Skills for Research',
      subtitle:
        'The comparison describes declared scope and implementation structure. Each collection addresses a different workflow breadth and operating model.',
      headers: [
        'Evaluation Criteria',
        'Scientific Agent Skills (v2.65.0)',
        'Science Superpowers',
        'Research Kit (Lean Mindset)',
      ],
      rows: [
        {
          criteria: 'Skill Count',
          comp1: '163 skills in one large free collection',
          comp2: '16 skills',
          kit: '10 skills: 6 core stages + 4 domain modules',
          highlight: true,
        },
        {
          criteria: 'System Prompt Footprint',
          comp1: '14,246 tokens (7.12%)',
          comp2: '~2,500 tokens',
          kit: '<1,000 tokens (<0.50%)',
          highlight: true,
        },
        {
          criteria: 'Bundled Runtime Components',
          comp1: '105 Python scripts + 29 env vars',
          comp2: 'Harness hooks + automated Git scripts',
          kit: 'No bundled runtime scripts; Markdown SOPs',
          highlight: true,
        },
        {
          criteria: 'Operating Model',
          comp1: 'Broad free collection with helper scripts',
          comp2: 'Hook-supported automated workflow',
          kit: 'Instruction-based sequential workflow',
          highlight: true,
        },
        {
          criteria: 'Routing Structure',
          comp1: 'Choose among every skill in the collection',
          comp2: 'Rule- and hook-based routing',
          kit: 'Stage-based routing with adjacent-stage context',
          highlight: false,
        },
        {
          criteria: 'Multi-Paper Repositories',
          comp1: 'General repository workflows',
          comp2: 'Single docs/ workspace model',
          kit: 'Active-paper resolution + read-only shared shelf',
          highlight: true,
        },
        {
          criteria: 'Version-Control Behavior',
          comp1: 'Standard repository operations',
          comp2: 'Git hooks and automated commits',
          kit: 'No automated Git operations in skill definitions',
          highlight: false,
        },
        {
          criteria: 'QPU / Cloud Cost Protection',
          comp1: 'Scope not specified in this comparison',
          comp2: 'Local execution',
          kit: 'Local simulation by default; QPU requires budget approval',
          highlight: false,
        },
      ],
    },
    multipaper: {
      eyebrow: 'EVIDENCE BOUNDARIES',
      heading: 'One Repository, Multiple Papers, Separate Evidence Trails',
      subtitle:
        'Research Kit defines paper-level boundaries so AI-assisted tasks use the intended sources, data, drafts, and analysis for each manuscript.',
      figureLabel: 'Figure 02',
      figureTitle: 'Active Paper Isolation & Read-Only Shared Literature Architecture',
      figureCaption:
        'Each manuscript workspace operates independently with dedicated data and draft directories, referencing shared literature in read-only mode.',
      principles: [
        {
          num: '01',
          title: 'Active Paper Resolution',
          desc: 'Before reading data, running code, or drafting claims, the agent identifies the target paper from the prompt, current working directory, or local AGENTS.md. Ambiguity triggers a clarification request.',
        },
        {
          num: '02',
          title: 'Strict Evidence Boundaries',
          desc: 'Unpublished drafts, exploratory scripts, and raw data from sibling papers are excluded as baselines or evidence for the active manuscript.',
        },
        {
          num: '03',
          title: 'Read-Only Shared Literature Shelf',
          desc: 'A common literature/ directory can store papers and global .bib citations for a lab. Each citation is verified independently against the claims of the active paper.',
        },
      ],
    },
    install: {
      eyebrow: 'INSTALLATION',
      heading: 'Installation and Verification',
      subtitle:
        'Two installation paths are available: an agent-assisted ZIP workflow and standard command-line installation.',
      agentAssistedCard: {
        title: 'Option A: Agent-Assisted ZIP Installation',
        step1Label: 'Step 1: Download the skill archive',
        downloadBtn: 'Download',
        downloadUrl: 'https://github.com/vinhnt21/research-kit/archive/refs/heads/main.zip',
        step2Label: 'Step 2: Paste this instruction into the AI agent chat',
        agentPrompt:
          'Extract research-kit-main.zip and copy every directory matching skills/rk-* into the skills directory for the selected agent (for example, ~/.cursor/skills/, ~/.claude/skills/, ~/.codex/skills/, or ~/.agents/skills/).',
        copyPromptBtn: 'Copy',
        copiedPrompt: 'Copied!',
      },
      cliHeading: 'Option B: Command-Line Installation (CLI)',
      tabs: [
        {
          id: 'skills-cli',
          name: 'Skills CLI (Recommended)',
          desc: 'Install directly via the standard agent skills manager (Vercel Labs):',
          cmd: 'npx skills add vinhnt21/research-kit',
        },
        {
          id: 'github-cli',
          name: 'GitHub CLI (v2.90+)',
          desc: 'Install for a specific agent profile with GitHub CLI:',
          cmd: 'gh skill install vinhnt21/research-kit --agent cursor\n# Options: --agent claude-code | --agent codex | --agent antigravity',
        },
        {
          id: 'manual',
          name: 'Manual Git Clone',
          desc: 'Clone the repository and place skills/rk-* in the selected agent configuration directory:',
          cmd: 'git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/  # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/  # Claude Code\n# cp -r research-kit/skills/rk-* ~/.agents/skills/  # Antigravity',
        },
      ],
      verifyTitle: 'Verify the Installation',
      verifyDesc: 'Run the included test suite to validate skill metadata and local references:',
      verifyCmd: 'python3 scripts/check-suite.py',
    },
    faq: {
      eyebrow: 'FREQUENTLY ASKED QUESTIONS',
      heading: 'Frequently Asked Questions',
      items: [
        {
          q: 'Does Research Kit write an entire paper autonomously?',
          a: 'No. Research Kit defines standard operating procedures for bounded tasks such as literature review, data-check workflows, and manuscript structure. Researchers define hypotheses, interpret results, verify evidence, and retain responsibility for scientific claims.',
        },
        {
          q: 'Why does Research Kit contain 10 skills?',
          a: 'The scope follows the research lifecycle: 6 skills cover the core sequence from survey to reporting, and 4 modules cover selected domains. This boundary keeps persistent instructions small and routing tied to the current research stage.',
        },
        {
          q: 'Is Research Kit completely free and open source?',
          a: 'Yes. Research Kit is distributed under the Apache-2.0 license and can be used in academic, personal, and commercial research workflows under that license.',
        },
        {
          q: 'Why are no external Python scripts bundled?',
          a: 'Research Kit describes research procedures in Markdown and leaves execution to the libraries already selected for a project. Version-specific API usage can then be checked against official documentation for the active environment.',
        },
        {
          q: 'How much persistent context does Research Kit use?',
          a: 'The 10 skill descriptions occupy fewer than 1,000 tokens, or less than 0.50% of a 200k context window. Actual token usage still depends on the active task, loaded references, and agent environment.',
        },
        {
          q: 'Which research fields can use the core workflow?',
          a: 'The 6 core skills—rk-survey, rk-idea, rk-method, rk-data, rk-write, and rk-report—describe a general empirical workflow that can be adapted across disciplines. The 4 domain modules are optional extensions.',
        },
        {
          q: 'How are installed skills invoked?',
          a: 'Supported agents can detect installed skills. A prompt can name a skill such as @rk-survey, @rk-idea, or @rk-data, or describe a research task for stage-based routing.',
        },
      ],
    },
    cta: {
      title: 'Keep AI Assistance Focused on the Research Process',
      subtitle:
        'Compact procedures for verifying literature and citations, developing research methods, processing data, and aligning conclusions with evidence.',
      button: 'Install',
      secondary: 'View on Git',
      meta: 'Free and Open Source • Local Markdown Procedures',
      starCallout: 'Support the continued development of Research Kit with a Star on GitHub.',
      starCalloutLink: 'Support with a Star',
    },
    footer: {
      tagline: 'Lean research procedures and empirical verification boundaries for AI agents.',
      repo: 'GitHub Repository',
      docs: 'Documentation',
      guides: 'Guide on Git',
      guideUrl: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.md',
      license: 'Apache-2.0 License',
      issues: 'Report Issue',
      copy: '© 2026 Research Kit Contributors. Open source under Apache-2.0.',
    },
  },
  vi: {
    nav: {
      intro: 'Giới thiệu',
      advantages: 'Nguyên tắc',
      roadmap: 'Lộ trình',
      docs: 'Tài liệu',
      install: 'Cài đặt',
      faq: 'Hỏi đáp',
      starGitHub: 'GitHub Star',
      toggleTheme: 'Đổi Giao diện',
      menu: 'Danh mục',
      close: 'Đóng',
    },
    figureViewer: {
      zoom: 'Phóng to',
      fullscreen: 'Toàn màn hình',
      fit: 'Thu vừa',
      readable: 'Cuộn rõ chữ',
      scrollHint: '← Vuốt ngang để xem chi tiết',
      tapToZoom: 'Chạm để phóng to',
      openOriginal: 'Mở SVG gốc',
      resetZoom: 'Đặt lại',
      close: 'Đóng',
    },
    roadmap: {
      eyebrow: 'LỘ TRÌNH PHÁT TRIỂN',
      title: 'Vì sao không dùng các bộ skill có sẵn?',
      subtitle:
        'Hình dưới đặt hai cách làm cạnh nhau: bộ skill miễn phí rất lớn, và Research Kit xếp theo từng giai đoạn nghiên cứu.',
      figure: {
        src: '/figures/human-agent-pipeline-vi.svg',
        alt: 'So sánh hai cách làm việc: bên trên là bộ skill miễn phí với hơn 150 skill, agent dễ chọn nhầm và kết quả khó kiểm; bên dưới là Research Kit với 10 skill theo giai đoạn, agent làm đúng việc và nhà nghiên cứu kiểm tra nhanh hơn.',
        label: 'Hình 01',
        caption:
          'Bộ skill miễn phí có hơn 150 mục nên khó chọn đúng và khó kiểm lại kết quả. Research Kit chỉ có 10 skill, xếp theo giai đoạn nghiên cứu, nên agent làm đúng việc đang cần và nhà nghiên cứu quyết định nhanh hơn.',
      },
      explanation:
        'Agent không thiếu khả năng. Vấn đề là có quá nhiều lựa chọn đứng giữa nhà nghiên cứu và việc cần làm. Skill càng nhiều, agent càng dễ chọn nhầm, còn người càng khó biết hệ thống đang làm gì. Research Kit bớt các lựa chọn đó, chỉ giao cho agent những việc hỗ trợ có giới hạn rõ, và để nhà nghiên cứu giữ câu hỏi, phương pháp, phần kiểm chứng và kết luận.',
      timelineEyebrow: 'TỪ VẤN ĐỀ ĐẾN GIẢI PHÁP',
      timelineTitle: 'Từ vấn đề gặp phải đến bộ skill đang dùng',
      timelineSubtitle:
        'Bắt đầu từ vấn đề khi dùng các bộ skill lớn, thu lại thành phần cốt lõi gọn, rồi bổ sung tiếp những gì nghiên cứu thực sự cần.',
      sequenceLabel: 'Các mốc phát triển Research Kit',
      milestones: [
        {
          number: '01',
          tone: 'friction',
          phase: 'Thử dùng',
          title: 'Dùng các bộ skill miễn phí có sẵn',
          description:
            'Mang các bộ skill lớn, được chia sẻ miễn phí, vào việc nghiên cứu thật và xem người với agent làm việc cùng nhau ra sao.',
        },
        {
          number: '02',
          tone: 'friction',
          phase: 'Vấn đề',
          title: 'Cả người và agent đều bị rối',
          description:
            'Agent có quá nhiều hướng chồng lên nhau. Nhà nghiên cứu phải học và theo dõi nhiều lớp chỉ dẫn trước khi làm được việc chính.',
        },
        {
          number: '03',
          tone: 'core',
          phase: 'Rút gọn',
          title: 'Đọc, so sánh và bỏ phần trùng',
          description:
            'Giữ các bước kiểm chứng cần thiết. Bỏ những chỗ trùng về ai phụ trách việc gì, cách chọn skill và phần chỉ dẫn.',
        },
        {
          number: '04',
          tone: 'core',
          phase: 'Hiện tại',
          title: 'Gom thành một quy trình nghiên cứu gọn',
          description:
            'Mỗi giai đoạn có một đường đi rõ. Câu hỏi khoa học vẫn do nhà nghiên cứu quyết định.',
        },
        {
          number: '05',
          tone: 'future',
          phase: 'Tiếp theo',
          title: 'Bổ sung nền tảng về phương pháp',
          description:
            'Làm rõ cách thiết kế nghiên cứu, chọn phương pháp, ước lượng độ mạnh thống kê, độ chính xác, thiên lệch và tính hợp lệ.',
        },
        {
          number: '06',
          tone: 'future',
          phase: 'Tiếp theo',
          title: 'Bổ sung cách đọc kết quả thống kê',
          description:
            'Làm rõ cách chọn phép kiểm, các giả định đi kèm, cỡ hiệu ứng, mức không chắc chắn và cách diễn giải kết quả.',
        },
        {
          number: '07',
          tone: 'future',
          phase: 'Liên tục',
          title: 'Làm chắc bước kiểm chứng và chạy lại',
          description:
            'Theo dõi nguồn dữ liệu rõ hơn, xử lý số liệu bất thường cẩn thận hơn, chạy lại từ dữ liệu gốc và đối chiếu luận điểm với bằng chứng.',
        },
        {
          number: '…',
          tone: 'future',
          phase: 'Sau này',
          title: 'Chỉ thêm những gì giúp nghiên cứu tốt hơn',
          description:
            'Một kỹ thuật mới chỉ được đưa vào khi nó giúp nghiên cứu sâu hơn, không thêm lựa chọn thừa và không lấy mất quyền quyết định của nhà nghiên cứu.',
        },
      ],
      explore: 'Xem bộ skill hiện tại',
    },
    hero: {
      badge: 'Mã nguồn mở • Quy trình nghiên cứu tinh gọn',
      badgeShort: 'Mã nguồn mở',
      title: 'Quy Trình Nghiên Cứu Tinh Gọn Cho AI Agent',
      subtitle:
        'Research Kit tổ chức nghiên cứu có AI hỗ trợ thành 6 giai đoạn cốt lõi và 4 module chuyên ngành. Quy trình kiểm tra nguồn để ngăn tài liệu bịa đặt lọt vào khảo sát, hỗ trợ xây dựng câu hỏi và phương pháp nghiên cứu, đồng thời hướng dẫn xử lý dữ liệu từ dữ liệu thô đến kết quả báo cáo. Các quyết định khoa học vẫn thuộc về nhà nghiên cứu.',
      installLabel: 'Cài đặt 10 skill bằng một lệnh:',
      copied: 'Đã sao chép!',
      copyBtn: 'Sao chép',
      starCallout:
        'Ủng hộ Research Kit bằng một Star trên GitHub và góp phần duy trì công cụ nghiên cứu mở.',
      starCalloutLink: 'Ủng hộ bằng Star',
      altInstallPrompt: 'Hoặc cài qua GitHub CLI:',
      zipNotice: 'Cũng có phương thức cài đặt bằng giao diện đồ họa.',
      zipLinkText: 'Tải file ZIP để cài đặt với AI Agent hỗ trợ',
      supportedAgents: 'Các môi trường agent được hỗ trợ:',
      stats: [
        { label: 'Chiếm Dụng Context', value: '<0,50%', sub: '<1.000 token luôn được nạp' },
        { label: 'Quy Trình Cốt Lõi', value: '6 Giai Đoạn', sub: '+ 4 module chuyên ngành' },
        { label: 'Script Đi Kèm', value: '0 Script', sub: 'Quy trình viết bằng Markdown' },
        { label: 'Giấy Phép', value: 'Apache-2.0', sub: 'Miễn phí và mã nguồn mở' },
      ],
    },
    lifecycle: {
      eyebrow: 'QUY TRÌNH THỰC NGHIỆM',
      heading: 'Vòng Đời Nghiên Cứu Khoa Học Qua 6 Giai Đoạn',
      subtitle:
        'Mỗi giai đoạn xác định phạm vi, kết quả của bước đó và mốc kiểm chứng—từ kiểm tra nguồn, xây dựng phương pháp đến xử lý và chạy lại dữ liệu. AI hỗ trợ thực thi trong các ranh giới đó; nhà nghiên cứu kiểm soát các quyết định khoa học.',
      figureLabel: 'Hình 01',
      figureTitle: 'Quy trình thực thi 6 giai đoạn cốt lõi & 4 module mở rộng',
      figureCaption:
        'Luồng tuần tự từ khảo sát tài liệu đến báo cáo kết quả kèm tiêu chuẩn kiểm chứng và 4 module chuyên sâu.',
      coreTitle: 'Phần 1: 6 Giai Đoạn Cốt Lõi',
      coreSubtitle:
        'Thẩm định nguồn, xây dựng phương pháp, xử lý dữ liệu, viết bài và báo cáo trong một quy trình tuần tự:',
      domainTitle: 'Phần 2: 4 Module Chuyên Ngành',
      domainSubtitle: 'Hướng dẫn bổ sung cho nghiên cứu tính toán và trình bày học thuật:',
      skills: [
        {
          id: 'rk-survey',
          iconKey: 'search',
          stage: 'Giai đoạn 01',
          name: 'Khảo Sát Tài Liệu & Thẩm Định Nguồn Gốc',
          duty: 'Tìm kiếm có hệ thống, lập bản đồ bằng chứng, đối chiếu nguồn trích dẫn và phát hiện khoảng trống tri thức.',
          gate: 'Ghi nhận biên tìm kiếm và kiểm tra nguồn gốc trích dẫn theo checklist.',
          files: 'references/search-boundary.md, citation-check.md, assets/search-record.md',
        },
        {
          id: 'rk-idea',
          iconKey: 'lightbulb',
          stage: 'Giai đoạn 02',
          name: 'Hình Thành Ý Tưởng & Giả Thuyết Đối Lập',
          duty: 'Xác lập câu hỏi nghiên cứu, xây dựng ma trận giả thuyết đối lập và xác định tiêu chí để bác bỏ giả thuyết.',
          gate: 'Quyết định làm hoặc dừng trước khi triển khai và phân bổ tài nguyên tính toán.',
          files: 'references/framing.md, rivals-and-falsification.md, assets/rival-matrix.md',
        },
        {
          id: 'rk-method',
          iconKey: 'flask',
          stage: 'Giai đoạn 03',
          name: 'Thiết Kế Phương Pháp & Đóng Băng Giao Thức',
          duty: 'Thiết kế thực nghiệm, nhóm đối chứng, phân tích độ chuẩn xác, cỡ mẫu và ước tính ngân sách chạy máy.',
          gate: 'Ghi nhận giao thức trước khi phân tích để hạn chế việc thử nhiều phép đo rồi mới chọn kết quả có lợi.',
          files: 'references/design-choice.md, power-and-precision.md, assets/method-plan.md',
        },
        {
          id: 'rk-data',
          iconKey: 'barChart',
          stage: 'Giai đoạn 04',
          name: 'Xử Lý Dữ Liệu Thô & Chạy Lại Kiểm Chứng',
          duty: 'Kiểm tra dữ liệu thô, phân tích thống kê, kết xuất đồ thị xuất bản và xử lý số liệu bất thường.',
          gate: 'Chạy lại từ dữ liệu gốc, độc lập với lần phân tích trước, rồi mới báo cáo kết quả.',
          files: 'references/inspect.md, test-choice.md, figures.md, assets/analysis-record.md',
        },
        {
          id: 'rk-write',
          iconKey: 'fileText',
          stage: 'Giai đoạn 05',
          name: 'Soạn Thảo Bản Thảo Khoa Học Chuẩn Mực',
          duty: 'Soạn thảo bài báo theo cấu trúc chuẩn, mỗi đoạn một ý cốt lõi, soạn bản phản hồi phản biện sắc sảo.',
          gate: 'Đối soát luận điểm với bằng chứng thực nghiệm trước khi nộp.',
          files: 'references/claim-evidence.md, section-roles.md, paragraph-flow.md',
        },
        {
          id: 'rk-report',
          iconKey: 'share2',
          stage: 'Giai đoạn 06',
          name: 'Báo Cáo Tiến Độ & Bảo Vệ Kết Quả',
          duty: 'Tóm tắt tiến độ, báo cáo tổng hợp kết quả nghiên cứu và chuẩn bị nội dung thuyết trình bảo vệ.',
          gate: 'Báo cáo chỉ đưa các kết quả thực nghiệm đã được kiểm chứng.',
          files: 'references/report-gate.md, assets/report-record.md',
        },
      ],
      domains: [
        {
          id: 'rk-quantum',
          iconKey: 'cpu',
          domain: 'Tính Toán Lượng Tử',
          duty: 'Mô phỏng mạch, Hamiltonian cục bộ, thuật toán biến phân (VQE, QAOA).',
          gate: 'Mặc định mô phỏng tại máy; chạy trên máy tính lượng tử thật phải được duyệt ngân sách.',
        },
        {
          id: 'rk-quantum-network',
          iconKey: 'network',
          domain: 'Mạng Lượng Tử',
          duty: 'Phân phối liên đới lượng tử, trạm lặp bộ nhớ, chọn đường truyền và lập lịch gửi tin.',
          gate: 'Kiểm tra giới hạn độ trung thực & xác thực trạng thái giao thức mạng.',
        },
        {
          id: 'rk-ai',
          iconKey: 'brain',
          domain: 'Trí Tuệ Nhân Tạo & Học Máy',
          duty: 'Chia tập huấn luyện, kiểm định và kiểm tra nghiêm ngặt, rà soát rò rỉ dữ liệu, cố định hạt ngẫu nhiên để chạy lại được.',
          gate: 'Kiểm tra rò rỉ dữ liệu và tính tái lập ngẫu nhiên của thí nghiệm.',
        },
        {
          id: 'rk-academic-visualize',
          iconKey: 'presentation',
          domain: 'Trực Quan Hóa & Slide Học Thuật',
          duty: 'Thiết kế hình minh họa khoa học (LaTeX TikZ, Mermaid, SVG) chống đè chữ/mũi tên và tạo slide bám sát nguồn tài liệu.',
          gate: 'Giảm tải nhận thức, kiểm tra hở mũi tên & kiểm định tự động bố cục slide.',
        },
      ],
    },
    pillars: {
      eyebrow: 'NGUYÊN TẮC THIẾT KẾ',
      heading: 'Tinh Gọn Và Tập Trung Vào Nghiên Cứu',
      subtitle:
        'Quy trình giữ phần hướng dẫn luôn được nạp ở mức nhỏ, giao cho AI các tác vụ hỗ trợ có ranh giới và dành phán đoán khoa học cho nhà nghiên cứu.',
      cards: [
        {
          iconKey: 'zap',
          title: 'Phần Nạp Sẵn Rất Nhỏ',
          desc: 'Mười skill dùng dưới 1.000 token luôn được nạp sẵn, chưa đến 0,50% cửa sổ context 200k. Phần context còn lại dành cho tài liệu, dữ liệu, phương pháp và phân tích.',
        },
        {
          iconKey: 'shield',
          title: 'Kiểm Chứng Tài Liệu, Phương Pháp Và Dữ Liệu',
          desc: 'Biên tìm kiếm và kiểm tra nguồn giúp ngăn tài liệu bịa đặt lọt vào khảo sát. Ma trận giả thuyết đối lập và giao thức được ghi nhận hỗ trợ xây dựng phương pháp; kiểm tra dữ liệu thô và chạy lại từ dữ liệu gốc hỗ trợ xử lý dữ liệu, kiểm chứng kết quả.',
        },
        {
          iconKey: 'layers',
          title: 'Ranh Giới Bằng Chứng Theo Bài Báo',
          desc: 'Cơ chế xác định bài báo hiện hành tách bằng chứng, bản thảo và phân tích của nhiều công trình trong cùng một kho mã. Tài liệu dùng chung chỉ được đọc, và trích dẫn được kiểm tra theo từng bản thảo.',
        },
        {
          iconKey: 'unlock',
          title: 'Quy Trình Markdown Có Tính Di Động',
          desc: 'Các skill là quy trình viết bằng Markdown. Không kèm script chạy sẵn, không tự thao tác Git và không phụ thuộc nền tảng; mã nguồn, dữ liệu và quyết định khoa học vẫn thuộc quyền kiểm soát của nhà nghiên cứu.',
        },
      ],
    },
    context: {
      eyebrow: 'CHIẾM DỤNG CONTEXT',
      heading: 'Giữ Phần Hướng Dẫn Luôn Được Nạp Ở Mức Vừa Với Công Việc',
      subtitle:
        'Phần mô tả skill chiếm một phần context của mô hình. Mức chiếm nhỏ hơn dành thêm chỗ cho tài liệu, dữ liệu thực nghiệm và câu hỏi nghiên cứu đang làm.',
      figureLabel: 'Hình 03',
      figureTitle: 'So sánh phần context luôn được nạp',
      figureCaption:
        'So sánh mức tiêu tốn context: bộ 163 skill chiếm 7,12% (~14.246 token) so với Research Kit chỉ chiếm <0,50% (~1.000 token).',
      competitorBadge: 'Bộ skill quá lớn',
      competitorTitle: 'Scientific Agent Skills (v2.65.0)',
      competitorTokens: '14.246 Tokens',
      competitorPercent: '7,12% của Cửa sổ 200k',
      competitorDesc:
        'Một bộ skill miễn phí, phạm vi rộng, gồm 163 skill, 105 script Python và 29 biến thông tin đăng nhập, viết để phủ nhiều việc khác nhau của agent.',
      kitBadge: 'Quy trình tinh gọn',
      kitTitle: 'Research Kit (Cấu hình tinh gọn)',
      kitTokens: '<1.000 Tokens',
      kitPercent: '<0,50% của Cửa sổ 200k',
      kitDesc:
        'Một bộ tập trung gồm 10 skill: 6 giai đoạn nghiên cứu tuần tự và 4 module chuyên ngành, viết bằng Markdown và không kèm script chạy sẵn.',
      savingsHeadline: 'Phần luôn được nạp chênh nhau hơn 13.000 token.',
    },
    comparison: {
      eyebrow: 'ĐỐI CHIẾU CẤU TRÚC',
      heading: 'Ba Cách Tổ Chức Agent Skills Cho Nghiên Cứu',
      subtitle:
        'Bảng đối chiếu mô tả phạm vi công bố và cách triển khai. Mỗi bộ phục vụ một độ rộng quy trình và cách vận hành khác nhau.',
      headers: [
        'Tiêu Chí Đánh Giá',
        'Scientific Agent Skills (v2.65.0)',
        'Science Superpowers',
        'Research Kit (Cách làm tinh gọn)',
      ],
      rows: [
        {
          criteria: 'Số lượng Skill',
          comp1: '163 skill trong danh mục phạm vi rộng',
          comp2: '16 skill',
          kit: '10 skill: 6 giai đoạn cốt lõi + 4 module chuyên ngành',
          highlight: true,
        },
        {
          criteria: 'Token nạp sẵn vào prompt',
          comp1: '14.246 tokens (7,12%)',
          comp2: '~2.500 tokens',
          kit: '<1.000 tokens (<0,50%)',
          highlight: true,
        },
        {
          criteria: 'Thành Phần Runtime Đi Kèm',
          comp1: '105 script Python + 29 biến môi trường',
          comp2: 'Script tự chạy khi mở phiên + commit Git tự động',
          kit: 'Không kèm script chạy sẵn; quy trình Markdown',
          highlight: true,
        },
        {
          criteria: 'Mô Hình Vận Hành',
          comp1: 'Bộ skill rộng, có script hỗ trợ',
          comp2: 'Quy trình tự chạy kèm script',
          kit: 'Quy trình tuần tự dựa trên hướng dẫn',
          highlight: true,
        },
        {
          criteria: 'Cách chọn skill',
          comp1: 'Chọn trong cả bộ skill',
          comp2: 'Chọn skill bằng luật và script tự chạy',
          kit: 'Chọn skill theo giai đoạn đang làm',
          highlight: false,
        },
        {
          criteria: 'Quản Lý Đa Bài Báo Trong Cùng Repo',
          comp1: 'Workflow repository tổng quát',
          comp2: 'Mô hình một workspace docs/',
          kit: 'Xác định bài báo hiện hành + kệ tài liệu chỉ đọc',
          highlight: true,
        },
        {
          criteria: 'Hành Vi Với Hệ Thống Quản Lý Phiên Bản',
          comp1: 'Thao tác repository tiêu chuẩn',
          comp2: 'Script Git và commit tự động',
          kit: 'Không tự động thao tác Git trong định nghĩa skill',
          highlight: false,
        },
        {
          criteria: 'Kiểm soát chi phí đám mây và máy lượng tử',
          comp1: 'Phạm vi không được nêu trong bảng đối chiếu này',
          comp2: 'Chạy trên máy local',
          kit: 'Mặc định mô phỏng tại máy; máy lượng tử cần duyệt ngân sách',
          highlight: false,
        },
      ],
    },
    multipaper: {
      eyebrow: 'RANH GIỚI BẰNG CHỨNG',
      heading: 'Một Repository, Nhiều Bài Báo, Các Tuyến Bằng Chứng Tách Biệt',
      subtitle:
        'Research Kit xác định ranh giới theo từng bài báo để tác vụ có AI hỗ trợ sử dụng đúng nguồn, dữ liệu, bản thảo và phân tích của mỗi công trình.',
      figureLabel: 'Hình 02',
      figureTitle: 'Tách bài báo đang làm và kệ tài liệu dùng chung',
      figureCaption:
        'Mỗi bài báo làm việc riêng, không lấy nhầm dữ liệu của bài khác, và chỉ đọc kệ tài liệu dùng chung.',
      principles: [
        {
          num: '01',
          title: 'Xác định bài báo đang làm',
          desc: 'Trước khi đọc dữ liệu, chạy mã hay nêu kết luận, agent xác định bài báo mục tiêu từ prompt, thư mục đang mở hoặc file AGENTS.md trong thư mục đó. Nếu chưa rõ, agent phải hỏi lại trước khi tiếp tục.',
        },
        {
          num: '02',
          title: 'Ranh Giới Bằng Chứng Theo Công Trình',
          desc: 'Bản thảo nháp, script thử nghiệm và số liệu chưa công bố của bài báo khác không được dùng làm chứng cứ, mốc so sánh hay tài liệu trích dẫn cho bài báo hiện hành.',
        },
        {
          num: '03',
          title: 'Kệ tài liệu dùng chung, chỉ được đọc',
          desc: 'Thư mục literature/ dùng chung có thể lưu các bài báo và danh mục trích dẫn toàn cục của phòng nghiên cứu. Mỗi trích dẫn được thẩm định riêng đối với các luận điểm của bài báo hiện hành.',
        },
      ],
    },
    install: {
      eyebrow: 'CÀI ĐẶT',
      heading: 'Cài Đặt Và Kiểm Tra',
      subtitle:
        'Có hai phương thức cài đặt: quy trình dùng file ZIP với AI Agent hỗ trợ và quy trình dòng lệnh tiêu chuẩn.',
      agentAssistedCard: {
        title: 'Cách A: Cài Đặt File ZIP Với AI Agent Hỗ Trợ',
        step1Label: 'Bước 1: Tải bộ skill dạng file ZIP',
        downloadBtn: 'Tải về ZIP',
        downloadUrl: 'https://github.com/vinhnt21/research-kit/archive/refs/heads/main.zip',
        step2Label: 'Bước 2: Dán chỉ dẫn này vào khung chat của AI Agent',
        agentPrompt:
          'Giải nén file research-kit-main.zip và sao chép toàn bộ thư mục khớp mẫu skills/rk-* vào thư mục skills của agent được chọn (ví dụ ~/.cursor/skills/, ~/.claude/skills/, ~/.codex/skills/ hoặc ~/.agents/skills/).',
        copyPromptBtn: 'Sao chép prompt',
        copiedPrompt: 'Đã sao chép!',
      },
      cliHeading: 'Cách B: Cài Đặt Qua Dòng Lệnh (CLI)',
      tabs: [
        {
          id: 'skills-cli',
          name: 'Skills CLI (Khuyến nghị)',
          desc: 'Cài đặt trực tiếp qua trình quản lý agent skills tiêu chuẩn (Vercel Labs):',
          cmd: 'npx skills add vinhnt21/research-kit',
        },
        {
          id: 'github-cli',
          name: 'GitHub CLI (v2.90+)',
          desc: 'Cài đặt trực tiếp cho từng hồ sơ agent cụ thể qua GitHub CLI:',
          cmd: 'gh skill install vinhnt21/research-kit --agent cursor\n# Tùy chọn: --agent claude-code | --agent codex | --agent antigravity',
        },
        {
          id: 'manual',
          name: 'Sao Chép Thủ Công (Git Clone)',
          desc: 'Clone repository và sao chép skills/rk-* vào thư mục cấu hình của agent:',
          cmd: 'git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/  # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/  # Claude Code\n# cp -r research-kit/skills/rk-* ~/.agents/skills/  # Antigravity',
        },
      ],
      verifyTitle: 'Kiểm Tra Cài Đặt',
      verifyDesc:
        'Chạy bộ kiểm thử đi kèm để kiểm tra phần mô tả của skill và các liên kết nội bộ:',
      verifyCmd: 'python3 scripts/check-suite.py',
    },
    faq: {
      eyebrow: 'HỎI ĐÁP THƯỜNG GẶP',
      heading: 'Giải Đáp Câu Hỏi & Thắc Mắc Thường Gặp',
      items: [
        {
          q: 'Research Kit có tự động viết toàn bộ bài báo không?',
          a: 'Không. Research Kit định nghĩa quy trình thao tác chuẩn cho các tác vụ có ranh giới như khảo sát tài liệu, kiểm tra dữ liệu và tổ chức bản thảo. Nhà nghiên cứu xác lập giả thuyết, diễn giải kết quả, kiểm chứng bằng chứng và chịu trách nhiệm về các luận điểm khoa học.',
        },
        {
          q: 'Vì sao Research Kit gồm 10 skill?',
          a: 'Phạm vi được tổ chức theo vòng đời nghiên cứu: 6 skill bao quát chuỗi cốt lõi từ khảo sát đến báo cáo, còn 4 module dành cho một số chuyên ngành. Ranh giới này giữ phần hướng dẫn luôn được nạp ở mức nhỏ và chọn skill theo giai đoạn đang làm.',
        },
        {
          q: 'Research Kit có hoàn toàn miễn phí và mã nguồn mở không?',
          a: 'Có. Research Kit được phát hành theo giấy phép Apache-2.0 và có thể được sử dụng trong quy trình nghiên cứu học thuật, cá nhân hoặc thương mại theo các điều khoản của giấy phép.',
        },
        {
          q: 'Vì sao không có script Python bên ngoài đi kèm?',
          a: 'Research Kit mô tả quy trình nghiên cứu bằng Markdown và để phần thực thi cho các thư viện đã được chọn trong từng dự án. Cách dùng API theo phiên bản có thể được kiểm tra với tài liệu chính thức của môi trường đang hoạt động.',
        },
        {
          q: 'Research Kit nạp sẵn bao nhiêu context?',
          a: 'Mô tả của 10 skill chiếm dưới 1.000 token, tương đương dưới 0,50% cửa sổ context 200k. Mức sử dụng token thực tế còn phụ thuộc vào tác vụ, tài liệu tham chiếu được nạp và môi trường agent.',
        },
        {
          q: 'Quy trình cốt lõi phù hợp với những lĩnh vực nào?',
          a: 'Sáu skill cốt lõi—rk-survey, rk-idea, rk-method, rk-data, rk-write và rk-report—mô tả một quy trình thực nghiệm tổng quát có thể điều chỉnh theo nhiều lĩnh vực. Bốn module chuyên ngành là phần mở rộng tùy chọn.',
        },
        {
          q: 'Các skill được gọi như thế nào sau khi cài đặt?',
          a: 'Các agent được hỗ trợ có thể nhận diện skill đã cài. Prompt có thể gọi trực tiếp @rk-survey, @rk-idea hoặc @rk-data, hoặc mô tả việc cần làm để agent chọn skill theo giai đoạn.',
        },
      ],
    },
    cta: {
      title: 'Giữ Vai Trò Của AI Tập Trung Vào Quy Trình Nghiên Cứu',
      subtitle:
        'Quy trình gọn để thẩm định tài liệu và nguồn trích dẫn, xây dựng phương pháp nghiên cứu, xử lý dữ liệu và đối soát kết luận với bằng chứng.',
      button: 'Cài đặt',
      secondary: 'Xem trên Git',
      meta: 'Miễn phí và Mã nguồn mở • Quy trình Markdown cục bộ',
      starCallout: 'Star Research Kit trên GitHub để ủng hộ quá trình duy trì và phát triển dự án.',
      starCalloutLink: 'Ủng hộ bằng Star',
    },
    footer: {
      tagline: 'Quy trình nghiên cứu tinh gọn và ranh giới kiểm chứng thực nghiệm cho AI Agent.',
      repo: 'Kho mã nguồn GitHub',
      docs: 'Tài liệu kỹ thuật',
      guides: 'Tài liệu kỹ thuật (Git)',
      guideUrl: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.vi.md',
      license: 'Giấy phép Apache-2.0',
      issues: 'Báo lỗi / Góp ý',
      copy: '© 2026 Research Kit Contributors. Mã nguồn mở theo giấy phép Apache-2.0.',
    },
  },
};
