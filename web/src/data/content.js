export const content = {
  en: {
    nav: {
      intro: 'Overview',
      roadmap: 'Development Log',
      docs: 'Docs',
      starGitHub: 'GitHub Star',
      toggleTheme: 'Toggle Theme',
      menu: 'Menu',
      close: 'Close',
    },
    toc: {
      button: 'Contents',
      title: 'Table of Contents',
      subtitle: 'Quickly jump to section',
      close: 'Close',
      items: [
        { id: 'hero', label: 'Top', desc: 'Hero & Quick Start', icon: 'top' },
        { id: 'lifecycle', label: 'Research Lifecycle', desc: '6 Stages & 4 Modules', icon: 'lifecycle' },
        { id: 'advantages', label: 'Lean Mindset', desc: 'Pillars & Context Footprint', icon: 'advantages' },
        { id: 'install', label: 'Installation', desc: 'ZIP File & CLI Hub', icon: 'install' },
        { id: 'faq', label: 'FAQ', desc: 'Common Questions', icon: 'faq' },
      ],
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
      devlogTitle: 'Development log',
      devlogLabel: 'Development log',
      entries: [
        {
          date: '2026-10-04',
          problem: 'Compiled figures could still have overlapping math blocks, crowded return labels, or incomplete card bounds.',
          fix: 'rk-academic-visualize v2.3.0 uses actual node heights, clear routing corridors, and comparable-card alignment. The agent must render, open the raster image, check five visual criteria, and fix and rerender defects before completion.',
        },
        {
          date: '2026-10-03',
          problem: 'The agent answered in English, or translated word by word, so the reply was hard to read.',
          fix: 'Skill instructions stay in English. Replies and notes use the language you wrote in. If that is unclear, the agent asks first. Vietnamese is written the way people talk.',
        },
        {
          date: '2026-10-02',
          problem: 'A separate slide skill sat next to the figure skill, so it was easy to open the wrong one.',
          fix: 'The slide skill now lives inside the figure skill. One skill handles paper figures and talk slides, with a short guide so the picture is easy to read.',
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
        { label: 'Toolchain Architecture', value: 'Auditable SOPs', sub: 'Focused standalone CLI tools' },
        { label: 'License', value: 'Apache-2.0', sub: 'Free and open source' },
      ],
    },
    news: {
      eyebrow: 'PROVENANCE & UPDATES',
      title: 'Engineering Log & Recent Releases',
      subtitle:
        'Reverse-chronological record of mathematical toolchains, architectural milestones, and protocol refinements.',
      items: [
        {
          date: '2026.10.04',
          badge: 'LaTeX Diagrams',
          badgeType: 'feature',
          id: 'figure-layout',
          title: 'Complex LaTeX diagram layouts',
          description:
            'Improved layout and rendering for LaTeX diagrams with complex flows. Spacing follows actual block heights, with aligned stages, clearer connectors and labels, and complete container bounds. The agent renders, inspects and repairs the figure before delivery.',
          image: {
            src: '/examples/academic-visualize/two-pass-flow.png',
            width: 1851,
            height: 1665,
            alt: 'Illustrative two-pass TikZ workflow with six aligned stages, return paths and a shared final update.',
            openLabel: 'View the two-pass workflow at full size',
            caption: 'Two-pass example · Click to view full size',
          },
          link: 'https://github.com/vinhnt21/research-kit/blob/main/skills/rk-academic-visualize/references/illustration-guide.md',
          linkText: 'View Layout & Rendering Guide',
        },
        {
          date: '2026.10.04',
          badge: 'Slides & Native Math',
          badgeType: 'feature',
          id: 'native-math',
          title: 'Slide rendering with native equations',
          description:
            'Improved slide rendering with native, editable equations inserted directly, without special-character substitutes. LaTeX is compiled to OMML, keeping inline equations in the text flow with matched font sizes. OOXML checks help detect content outside slide bounds.',
          image: {
            src: '/examples/academic-visualize/native-equation-slide.png',
            width: 3444,
            height: 2044,
            alt: 'Reference PowerPoint screenshot with a change-of-basis example and a native equation being edited.',
            openLabel: 'View the native-equation slide screenshot at full size',
            caption: 'Reference screenshot · Click to view full size',
          },
          link: 'https://github.com/vinhnt21/research-kit/tree/main/skills/rk-academic-visualize',
          linkText: 'View Skill & Tooling',
        },
        {
          date: '2026.10.03',
          badge: 'Skill Adaptation',
          badgeType: 'protocol',
          title: 'Dynamic Working Language Adaptation Across All 10 Skills',
          description:
            'Enhanced all 10 procedural skills to automatically converse and synthesize in the researcher\'s active language using natural peer-colleague dialogue ("như trao đổi cùng đồng nghiệp"), while strictly preserving English instructions for execution consistency and prompt stability across AI agents.',
          link: 'https://github.com/vinhnt21/research-kit/tree/main/skills',
          linkText: 'Explore Skills Suite',
        },
        {
          date: '2026.10.02',
          badge: 'Release v1.0.0',
          badgeType: 'release',
          title: 'Formal Release of the 10-Skill Scientific Lifecycle Suite',
          description:
            'Frozen baseline encompassing 6 core sequential research stages (`rk-survey` through `rk-report`) and 4 specialist domain modules, fortified with automated SHA-256 cryptographic check-suite verification (`scripts/check-suite.py`).',
          link: 'https://github.com/vinhnt21/research-kit/releases/tag/v1.0.0',
          linkText: 'Release Notes',
        },
        {
          date: '2026.10.01',
          badge: 'Portal & Guides',
          badgeType: 'docs',
          title: 'Dual-Language Academic Web Portal & Comprehensive Empirical Guides',
          description:
            'Launched the Research Kit web portal with interactive architecture lifecycle explorer, context footprint benchmarks, multi-paper isolation guides, and bilingual empirical playbooks (`documents/guide.md` and `documents/guide.vi.md`).',
          link: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.md',
          linkText: 'Explore Guides',
        },
      ],
    },
    lifecycle: {
      eyebrow: 'EMPIRICAL WORKFLOW',
      heading: 'From a Source Check to a Finished Paper',
      subtitle:
        'Build the method frame together, then carry verified sources through a frozen protocol, a clean rerun, the manuscript, and a finished package. Step-by-step detail lives in the docs.',
      docsLink: 'Details in the docs',
      figureLabel: 'Figure 01',
      figureTitle: '6-Stage Core Lifecycle & 4 Pluggable Domain Extensions',
      figureCaption:
        'Structured flow from literature survey to final reporting with empirical quality gates and four pluggable specialist modules.',
      coreTitle: '6 Core Workflow Stages',
      coreSubtitle:
        'Source verification, research-method design, data processing, writing, and reporting in one sequential workflow:',
      domainTitle: '4 Domain Modules',
      domainSubtitle: 'Additional guidance for computational research and academic presentation:',
      skills: [
        {
          id: 'rk-survey',
          iconKey: 'search',
          stage: '01',
          short: 'No fabricated sources',
          name: 'Literature Survey & Provenance',
          duty: 'Systematic literature search, evidence mapping, citation pedigree audit, and knowledge gap discovery.',
          gate: 'Recorded search boundary and citation verification checklist.',
          files: 'references/search-boundary.md, citation-check.md, assets/search-record.md',
        },
        {
          id: 'rk-idea',
          iconKey: 'lightbulb',
          stage: '02',
          short: 'Question frame',
          name: 'Hypothesis & Rival Falsification',
          duty: 'Formulate research questions, build rival hypotheses matrix, and specify falsification criteria.',
          gate: 'Go / No-Go decision gate before implementation and compute allocation.',
          files: 'references/framing.md, rivals-and-falsification.md, assets/rival-matrix.md',
        },
        {
          id: 'rk-method',
          iconKey: 'flask',
          stage: '03',
          short: 'Method frame',
          name: 'Methodology & Protocol Freeze',
          duty: 'Experimental design, baseline controls, power & precision analysis, run budget calculation.',
          gate: 'Protocol recorded before analysis to limit post-hoc selection and p-hacking.',
          files: 'references/design-choice.md, power-and-precision.md, assets/method-plan.md',
        },
        {
          id: 'rk-data',
          iconKey: 'barChart',
          stage: '04',
          short: 'Data and rerun',
          name: 'Raw Data & Rerun Verification',
          duty: 'Raw data inspection, statistical hypothesis testing, publication figures, and anomaly diagnosis.',
          gate: 'Clean rerun from raw data before reporting scientific findings.',
          files: 'references/inspect.md, test-choice.md, figures.md, assets/analysis-record.md',
        },
        {
          id: 'rk-write',
          iconKey: 'fileText',
          stage: '05',
          short: 'Manuscript',
          name: 'Structured Manuscript Drafting',
          duty: 'Academic paper authoring, one core idea per paragraph, formal rebuttal and reviewer response.',
          gate: 'Claim–evidence alignment review before submission.',
          files: 'references/claim-evidence.md, section-roles.md, paragraph-flow.md',
        },
        {
          id: 'rk-report',
          iconKey: 'share2',
          stage: '06',
          short: 'Finished package',
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
          duty: 'Scientific figures (LaTeX TikZ, Mermaid, SVG) with height-aware spacing, readable loopbacks, complete bounds, and slides grounded in the paper.',
          gate: 'Render and open the raster image; pass five visual checks after fixes, or report unverified. Slides stay grounded in the paper.',
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
          points: [
            {
              fear: 'Not running out of context mid-task',
              fix: 'Ten skills stay under 0.50% of the window, leaving the rest for the paper and the data.',
            },
            {
              fear: 'Not drowning the agent in tool choice',
              fix: 'Stage-by-stage routing points to the next skill instead of a catalog of 160+ options.',
            },
            {
              fear: 'Not paying for unused standing instructions',
              fix: 'Only the skills you need stay loaded; domain modules are added when the task needs them.',
            },
          ],
        },
        {
          iconKey: 'shield',
          title: 'Literature, Method, and Data Checks',
          points: [
            {
              fear: 'Not citing a wrong or fabricated paper',
              fix: 'A source check and a recorded search boundary come before anything enters the survey.',
            },
            {
              fear: 'Not leaving the method loose',
              fix: 'The method frame is built with the researcher and frozen before the experiment runs.',
            },
            {
              fear: 'Not reporting numbers before a clean rerun',
              fix: 'Results are reported only after a clean rerun from the raw data.',
            },
          ],
        },
        {
          iconKey: 'layers',
          title: 'Paper-Level Evidence Boundaries',
          points: [
            {
              fear: 'Not mixing one paper’s numbers into another',
              fix: 'Several papers can share one repo, each with its own evidence boundary.',
            },
            {
              fear: 'Not treating a draft next door as evidence',
              fix: 'Sibling drafts and unpublished scripts are never baselines or citations for the active paper.',
            },
            {
              fear: 'Not sharing literature without a check',
              fix: 'The shared literature shelf is read-only; each citation is verified for the active manuscript.',
            },
          ],
        },
        {
          iconKey: 'unlock',
          title: 'Writing and Researcher Control',
          points: [
            {
              fear: 'Not writing loosely or off the evidence',
              fix: 'One idea per paragraph, and every claim stays tied to evidence that was already checked.',
            },
            {
              fear: 'Not letting the agent own scientific decisions',
              fix: 'Go / stop calls, protocol freezes, and final claims stay with the researcher.',
            },
            {
              fear: 'Not locking the lab into one platform',
              fix: 'Skills operate as portable Markdown SOPs accompanied by standalone verification tools—no opaque runtime daemons and no forced Git automation.',
            },
          ],
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
        'A focused collection of 10 skills: 6 sequential research stages and 4 domain modules, designed as transparent Markdown SOPs with deterministic, standalone verification utilities.',
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
          kit: 'OMML/OOXML CLI + native-renderer guidance; Markdown SOPs',
          highlight: true,
        },
        {
          criteria: 'Operating Model',
          comp1: 'Broad free collection with helper scripts',
          comp2: 'Hook-supported automated workflow',
          kit: 'Instruction-based steps + rerun and visual inspection gates',
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
          criteria: 'Multiple Papers in One Repo',
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
      figureTitle: 'Multiple Papers in One Repo & Read-Only Shared Literature',
      figureCaption:
        'Each manuscript keeps a separate workspace in the same repo, with dedicated data and drafts, referencing shared literature in read-only mode.',
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
          note: 'Antigravity Scope Note: npx skills installs into .agents/skills/ for the current workspace. For global machine-wide installation in Google Antigravity IDE, use GitHub CLI (--dir ~/.gemini/config/skills --all) or manual copy.',
        },
        {
          id: 'github-cli',
          name: 'GitHub CLI (v2.90+)',
          desc: 'Install for a specific agent profile with GitHub CLI:',
          cmd: 'gh skill install vinhnt21/research-kit --agent cursor\n# Options: --agent claude-code | --agent codex | --agent antigravity\n# Antigravity IDE Global: gh skill install vinhnt21/research-kit --dir ~/.gemini/config/skills --all',
        },
        {
          id: 'manual',
          name: 'Manual Git Clone',
          desc: 'Clone the repository and place skills/rk-* in the selected agent configuration directory:',
          cmd: 'git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/        # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/        # Claude Code\n# cp -r research-kit/skills/rk-* ~/.gemini/config/skills/ # Antigravity (Global IDE)\n# cp -r research-kit/skills/rk-* .agents/skills/          # Antigravity (Workspace)\n# cp -r research-kit/skills/rk-* ~/.agents/skills/        # Universal Agents',
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
          q: 'How does Research Kit manage computational and compilation tooling?',
          a: 'Core Markdown SOPs need only a compatible agent. Slide math injection uses Pandoc and Python standard-library utilities; deck and suite checks also use Python. Figure work uses the format’s native renderer, then an image viewer to inspect raster output. The skill requires fixes and rerendering before a figure passes; if rendering or image inspection is unavailable, it remains explicitly unverified.',
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
      authorLink: 'About the author',
      authorUrl: 'https://vinhnguyenthanh.com',
    },
    footer: {
      tagline: 'Lean research procedures and empirical verification boundaries for AI agents.',
      repo: 'GitHub Repository',
      docs: 'Documentation',
      guides: 'Guide on Git',
      guideUrl: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.md',
      license: 'Apache-2.0 License',
      issues: 'Report Issue',
      authorLink: 'About the author',
      authorUrl: 'https://vinhnguyenthanh.com',
      copy: '© 2026 Research Kit Contributors. Open source under Apache-2.0.',
    },
  },
  vi: {
    nav: {
      intro: 'Giới thiệu',
      roadmap: 'Nhật ký cải tiến',
      docs: 'Tài liệu',
      starGitHub: 'GitHub Star',
      toggleTheme: 'Đổi Giao diện',
      menu: 'Danh mục',
      close: 'Đóng',
    },
    toc: {
      button: 'Mục lục',
      title: 'Mục Lục Trang',
      subtitle: 'Chuyển nhanh đến phần nội dung',
      close: 'Đóng',
      items: [
        { id: 'hero', label: 'Đầu trang', desc: 'Tổng quan & Giới thiệu', icon: 'top' },
        { id: 'lifecycle', label: 'Vòng đời nghiên cứu', desc: '6 giai đoạn & 4 module', icon: 'lifecycle' },
        { id: 'advantages', label: 'Tư duy tinh gọn', desc: 'Trụ cột & So sánh context', icon: 'advantages' },
        { id: 'install', label: 'Cài đặt & Bắt đầu', desc: 'File ZIP & Dòng lệnh CLI', icon: 'install' },
        { id: 'faq', label: 'Hỏi đáp thường gặp', desc: 'Giải đáp thắc mắc', icon: 'faq' },
      ],
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
      devlogTitle: 'Nhật ký cải tiến',
      devlogLabel: 'Nhật ký cải tiến',
      entries: [
        {
          date: '2026-10-04',
          problem: 'Hình đã biên dịch vẫn có thể đè khối chứa toán, chật nhãn loopback hoặc có khung bao thiếu nội dung.',
          fix: 'rk-academic-visualize v2.3.0 tính khoảng cách theo chiều cao thực, chừa hành lang đi dây và căn các thẻ so sánh. Agent phải render, mở ảnh raster, kiểm tra năm tiêu chí, rồi sửa và render lại khi có lỗi trước khi báo hoàn thành.',
        },
        {
          date: '2026-10-03',
          problem: 'Agent trả lời tiếng Anh, hoặc dịch từng chữ, nên câu khó đọc.',
          fix: 'Hướng dẫn trong skill vẫn là tiếng Anh. Câu trả lời và ghi chú viết theo ngôn ngữ bạn nhắn. Chưa rõ thì hỏi lại. Tiếng Việt viết như đang nói.',
        },
        {
          date: '2026-10-02',
          problem: 'Skill slide đứng riêng cạnh skill vẽ hình, dễ mở nhầm.',
          fix: 'Skill slide được gộp vào skill vẽ hình. Một skill lo cả hình trong bài báo và slide thuyết trình, có hướng dẫn ngắn để nhìn hình là hiểu.',
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
        { label: 'Kiến Trúc Công Cụ', value: 'Quy Trình Chuẩn SOP', sub: 'Công cụ CLI độc lập, minh bạch' },
        { label: 'Giấy Phép', value: 'Apache-2.0', sub: 'Miễn phí và mã nguồn mở' },
      ],
    },
    news: {
      eyebrow: 'LỊCH SỬ PHÁT TRIỂN & CẬP NHẬT',
      title: 'Nhật Ký Cải Tiến',
      subtitle:
        'Ghi chép tuần tự theo thời gian về những bước nâng cấp công cụ toán học, kiểm tra slide và chuẩn hóa quy trình học thuật.',
      items: [
        {
          date: '2026.10.04',
          badge: 'Diagram LaTeX',
          badgeType: 'feature',
          id: 'figure-layout',
          title: 'Bố cục diagram LaTeX nhiều luồng',
          description:
            'Cải thiện bố cục và render diagram LaTeX với nhiều luồng phức tạp. Tính khoảng cách theo chiều cao thực của khối, căn các tầng, đi dây và đặt nhãn rõ ràng, bảo đảm khung bao đủ nội dung. Agent render, xem ảnh và sửa lỗi bố cục trước khi bàn giao.',
          image: {
            src: '/examples/academic-visualize/two-pass-flow.png',
            width: 1851,
            height: 1665,
            alt: 'Luồng TikZ hai pass minh hoạ với sáu tầng căn thẳng, đường quay lại và khối cập nhật cuối chung.',
            openLabel: 'Xem ảnh luồng hai pass đầy đủ',
            caption: 'Ví dụ hai pass · Bấm để xem đầy đủ',
          },
          link: 'https://github.com/vinhnt21/research-kit/blob/main/skills/rk-academic-visualize/references/illustration-guide.md',
          linkText: 'Xem Hướng Dẫn Bố Cục & Render',
        },
        {
          date: '2026.10.04',
          badge: 'Slide & Công Thức Toán',
          badgeType: 'feature',
          id: 'native-math',
          title: 'Render slide với công thức toán native',
          description:
            'Cải thiện khả năng render slide và chèn công thức toán native chỉnh sửa được, không dùng ký tự đặc biệt thay thế. Biên dịch LaTeX sang OMML, giữ công thức trong dòng văn bản và đồng bộ phông, cỡ chữ. Kiểm tra OOXML giúp phát hiện nội dung tràn khung slide.',
          image: {
            src: '/examples/academic-visualize/native-equation-slide.png',
            width: 3444,
            height: 2044,
            alt: 'Ảnh PowerPoint tham chiếu với ví dụ đổi cơ sở và công thức native đang được chỉnh sửa.',
            openLabel: 'Xem ảnh slide công thức native đầy đủ',
            caption: 'Ảnh tham chiếu · Bấm để xem đầy đủ',
          },
          link: 'https://github.com/vinhnt21/research-kit/tree/main/skills/rk-academic-visualize',
          linkText: 'Xem Skill & Bộ Công Cụ',
        },
        {
          date: '2026.10.03',
          badge: 'Giao Tiếp Tự Nhiên',
          badgeType: 'protocol',
          title: 'Giao Tiếp Tự Nhiên Bằng Ngôn Ngữ Của Người Dùng Trên Cả 10 Skill',
          description:
            'Nâng cấp toàn bộ 10 kỹ năng nghiên cứu để tự động trao đổi và tổng hợp theo ngôn ngữ làm việc của nhà nghiên cứu bằng văn phong đồng nghiệp tự nhiên ("như trao đổi cùng đồng nghiệp"), đồng thời giữ nguyên cấu trúc chỉ dẫn tiếng Anh nhằm bảo đảm tính ổn định thực thi và tránh làm loãng ngữ cảnh của agent.',
          link: 'https://github.com/vinhnt21/research-kit/tree/main/skills',
          linkText: 'Khám Phá Bộ Skill',
        },
        {
          date: '2026.10.02',
          badge: 'Phát Hành v1.0.0',
          badgeType: 'release',
          title: 'Chính Thức Phát Hành Bộ 10 Skill Nghiên Cứu Khoa Học',
          description:
            'Đóng gói phiên bản v1.0.0 hoàn chỉnh gồm 6 kỹ năng tuần tự theo vòng đời bài báo (`rk-survey` đến `rk-report`) và 4 module chuyên sâu, đi kèm bộ kiểm tra tính toàn vẹn bằng mã băm SHA-256 (`scripts/check-suite.py`).',
          link: 'https://github.com/vinhnt21/research-kit/releases/tag/v1.0.0',
          linkText: 'Ghi Chú Phát Hành',
        },
        {
          date: '2026.10.01',
          badge: 'Cổng Thông Tin & Cẩm Nang Quy Trình',
          badgeType: 'docs',
          title: 'Ra Mắt Cổng Thông Tin Nghiên Cứu Song Ngữ & Cẩm Nang Quy Trình',
          description:
            'Khởi chạy cổng thông tin web Research Kit ([research-kit.vinhnguyenthanh.com](https://research-kit.vinhnguyenthanh.com)) với sơ đồ tương tác vòng đời nghiên cứu, số liệu đo lường mức chiếm dụng context, hướng dẫn phân vùng nhiều bài báo trong cùng repo và cẩm nang quy trình thực nghiệm chi tiết (`documents/guide.md` và `documents/guide.vi.md`).',
          link: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.vi.md',
          linkText: 'Đọc Cẩm Nang',
        },
      ],
    },
    lifecycle: {
      eyebrow: 'QUY TRÌNH THỰC NGHIỆM',
      heading: 'Từ kiểm nguồn đến bài báo hoàn chỉnh',
      subtitle:
        'Cùng xây dựng khung phương pháp, rồi đi hết kiểm nguồn, khóa giao thức, chạy lại dữ liệu, soạn bản thảo và đóng gói bài báo. Chi tiết từng bước nằm trong tài liệu.',
      docsLink: 'Chi tiết trong tài liệu',
      figureLabel: 'Hình 01',
      figureTitle: 'Quy trình thực thi 6 giai đoạn cốt lõi & 4 module mở rộng',
      figureCaption:
        'Luồng tuần tự từ khảo sát tài liệu đến báo cáo kết quả kèm tiêu chuẩn kiểm chứng và 4 module chuyên sâu.',
      coreTitle: '6 Giai Đoạn Cốt Lõi',
      coreSubtitle:
        'Thẩm định nguồn, xây dựng phương pháp, xử lý dữ liệu, viết bài và báo cáo trong một quy trình tuần tự:',
      domainTitle: '4 Module Chuyên Ngành',
      domainSubtitle: 'Hướng dẫn bổ sung cho nghiên cứu tính toán và trình bày học thuật:',
      skills: [
        {
          id: 'rk-survey',
          iconKey: 'search',
          stage: '01',
          short: 'Chống bịa nguồn',
          name: 'Khảo Sát Tài Liệu & Thẩm Định Nguồn Gốc',
          duty: 'Tìm kiếm có hệ thống, lập bản đồ bằng chứng, đối chiếu nguồn trích dẫn và phát hiện khoảng trống tri thức.',
          gate: 'Ghi nhận biên tìm kiếm và kiểm tra nguồn gốc trích dẫn theo checklist.',
          files: 'references/search-boundary.md, citation-check.md, assets/search-record.md',
        },
        {
          id: 'rk-idea',
          iconKey: 'lightbulb',
          stage: '02',
          short: 'Khung câu hỏi',
          name: 'Hình Thành Ý Tưởng & Giả Thuyết Đối Lập',
          duty: 'Xác lập câu hỏi nghiên cứu, xây dựng ma trận giả thuyết đối lập và xác định tiêu chí để bác bỏ giả thuyết.',
          gate: 'Quyết định làm hoặc dừng trước khi triển khai và phân bổ tài nguyên tính toán.',
          files: 'references/framing.md, rivals-and-falsification.md, assets/rival-matrix.md',
        },
        {
          id: 'rk-method',
          iconKey: 'flask',
          stage: '03',
          short: 'Khung phương pháp',
          name: 'Thiết Kế Phương Pháp & Đóng Băng Giao Thức',
          duty: 'Thiết kế thực nghiệm, nhóm đối chứng, phân tích độ chuẩn xác, cỡ mẫu và ước tính ngân sách chạy máy.',
          gate: 'Ghi nhận giao thức trước khi phân tích để hạn chế việc thử nhiều phép đo rồi mới chọn kết quả có lợi.',
          files: 'references/design-choice.md, power-and-precision.md, assets/method-plan.md',
        },
        {
          id: 'rk-data',
          iconKey: 'barChart',
          stage: '04',
          short: 'Dữ liệu & chạy lại',
          name: 'Xử Lý Dữ Liệu Thô & Chạy Lại Kiểm Chứng',
          duty: 'Kiểm tra dữ liệu thô, phân tích thống kê, kết xuất đồ thị xuất bản và xử lý số liệu bất thường.',
          gate: 'Chạy lại từ dữ liệu gốc, độc lập với lần phân tích trước, rồi mới báo cáo kết quả.',
          files: 'references/inspect.md, test-choice.md, figures.md, assets/analysis-record.md',
        },
        {
          id: 'rk-write',
          iconKey: 'fileText',
          stage: '05',
          short: 'Soạn bản thảo',
          name: 'Soạn Thảo Bản Thảo Khoa Học Chuẩn Mực',
          duty: 'Soạn thảo bài báo theo cấu trúc chuẩn, mỗi đoạn một ý cốt lõi, soạn bản phản hồi phản biện sắc sảo.',
          gate: 'Đối soát luận điểm với bằng chứng thực nghiệm trước khi nộp.',
          files: 'references/claim-evidence.md, section-roles.md, paragraph-flow.md',
        },
        {
          id: 'rk-report',
          iconKey: 'share2',
          stage: '06',
          short: 'Đóng gói hoàn thiện',
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
          duty: 'Mô hình Hamiltonian, mô phỏng mạch tại máy, thuật toán biến thiên (VQE, QAOA).',
          gate: 'Mặc định chỉ mô phỏng tại máy; chạy chip lượng tử thật phải được duyệt chi phí trước.',
        },
        {
          id: 'rk-quantum-network',
          iconKey: 'network',
          domain: 'Mạng Lượng Tử',
          duty: 'Phân phối liên đới lượng tử, bộ nhớ trạm lặp, định tuyến và lập lịch mạng.',
          gate: 'Kiểm tra độ trung thực và trạng thái giao thức trước khi kết luận thông lượng.',
        },
        {
          id: 'rk-ai',
          iconKey: 'brain',
          domain: 'Trí Tuệ Nhân Tạo & Học Máy',
          duty: 'Chia tập train/val/test nghiêm ngặt, phát hiện rò rỉ dữ liệu, cố định hạt ngẫu nhiên.',
          gate: 'Không rò rỉ dữ liệu; chuẩn hoá chỉ học trên tập train.',
        },
        {
          id: 'rk-academic-visualize',
          iconKey: 'presentation',
          domain: 'Trực Quan Hóa & Slide Học Thuật',
          duty: 'Vẽ hình khoa học (LaTeX TikZ, Mermaid, SVG) với khoảng cách theo chiều cao thực, loopback dễ đọc, khung bao đủ nội dung và slide bám bài báo.',
          gate: 'Render và mở ảnh raster; sửa đến khi đạt năm tiêu chí trực quan hoặc ghi rõ chưa xác minh. Slide bám luận điểm trong bài.',
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
          points: [
            {
              fear: 'Không hết context giữa chừng',
              fix: 'Mười skill chiếm dưới 0,50% cửa sổ, phần còn lại dành cho bài và số liệu.',
            },
            {
              fear: 'Không để agent lạc trong ma trận công cụ',
              fix: 'Định tuyến theo giai đoạn dẫn đúng skill kế tiếp, thay vì chọn trong hơn 160 lựa chọn.',
            },
            {
              fear: 'Không trả chi phí cho hướng dẫn thừa',
              fix: 'Chỉ nạp skill đang cần; module chuyên ngành thêm khi đúng việc.',
            },
          ],
        },
        {
          iconKey: 'shield',
          title: 'Kiểm Chứng Tài Liệu, Phương Pháp Và Dữ Liệu',
          points: [
            {
              fear: 'Không trích dẫn nhầm hoặc bịa tài liệu',
              fix: 'Kiểm nguồn và ghi biên tìm kiếm trước khi một tài liệu vào khảo sát.',
            },
            {
              fear: 'Không để phương pháp thiếu chặt chẽ',
              fix: 'Cùng dựng khung phương pháp và khóa giao thức trước khi chạy thí nghiệm.',
            },
            {
              fear: 'Không đưa số liệu chưa chạy lại được',
              fix: 'Chỉ báo cáo sau khi chạy lại từ dữ liệu gốc.',
            },
          ],
        },
        {
          iconKey: 'layers',
          title: 'Ranh Giới Bằng Chứng Theo Bài Báo',
          points: [
            {
              fear: 'Không lấy nhầm số của bài bên cạnh',
              fix: 'Nhiều bài trong cùng một repo, mỗi bài một ranh giới bằng chứng.',
            },
            {
              fear: 'Không coi bản nháp bên cạnh là bằng chứng',
              fix: 'Bản thảo và script chưa công bố của bài khác không được dùng làm baseline hay trích dẫn.',
            },
            {
              fear: 'Không dùng kệ tài liệu chung mà bỏ kiểm',
              fix: 'Thư mục literature/ chỉ đọc; mỗi trích dẫn vẫn phải kiểm riêng cho bài đang làm.',
            },
          ],
        },
        {
          iconKey: 'unlock',
          title: 'Bài Viết Và Quyền Quyết Định',
          points: [
            {
              fear: 'Không viết loãng hay lệch ý',
              fix: 'Mỗi đoạn một ý, luận điểm bám bằng chứng đã được kiểm.',
            },
            {
              fear: 'Không để agent quyết định thay nhà nghiên cứu',
              fix: 'Quyết định làm tiếp hay dừng, khóa giao thức và kết luận cuối vẫn thuộc về nhà nghiên cứu.',
            },
            {
              fear: 'Không bị khóa vào một nền tảng',
              fix: 'Skill hoạt động như quy trình SOP chuẩn bằng Markdown kết hợp công cụ kiểm tra độc lập—không dùng daemon nền và không tự ý can thiệp Git.',
            },
          ],
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
        'Một bộ công cụ tập trung gồm 10 skill: 6 giai đoạn nghiên cứu tuần tự và 4 module chuyên ngành, thiết kế dưới dạng SOP chuẩn bằng Markdown kèm công cụ kiểm tra độc lập.',
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
          kit: 'CLI OMML/OOXML + hướng dẫn renderer đúng định dạng; SOP Markdown',
          highlight: true,
        },
        {
          criteria: 'Mô Hình Vận Hành',
          comp1: 'Bộ skill rộng, có script hỗ trợ',
          comp2: 'Quy trình tự chạy kèm script',
          kit: 'Các bước theo hướng dẫn + cổng chạy lại và kiểm tra trực quan',
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
          criteria: 'Nhiều Bài Báo Trong Cùng Một Repo',
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
      figureTitle: 'Nhiều bài báo trong cùng một repo và kệ tài liệu dùng chung',
      figureCaption:
        'Mỗi bài báo có không gian riêng trong cùng repo, không lấy nhầm dữ liệu của bài khác, và chỉ đọc kệ tài liệu dùng chung.',
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
          note: 'Lưu ý cho Antigravity: npx skills cài đặt vào .agents/skills/ cho workspace hiện tại. Để cài toàn cục (global) cho Antigravity IDE, hãy dùng GitHub CLI (--dir ~/.gemini/config/skills --all) hoặc sao chép thủ công.',
        },
        {
          id: 'github-cli',
          name: 'GitHub CLI (v2.90+)',
          desc: 'Cài đặt trực tiếp cho từng hồ sơ agent cụ thể qua GitHub CLI:',
          cmd: 'gh skill install vinhnt21/research-kit --agent cursor\n# Tùy chọn: --agent claude-code | --agent codex | --agent antigravity\n# Cài toàn cục Antigravity IDE: gh skill install vinhnt21/research-kit --dir ~/.gemini/config/skills --all',
        },
        {
          id: 'manual',
          name: 'Sao Chép Thủ Công (Git Clone)',
          desc: 'Clone repository và sao chép skills/rk-* vào thư mục cấu hình của agent:',
          cmd: 'git clone https://github.com/vinhnt21/research-kit.git\ncp -r research-kit/skills/rk-* ~/.cursor/skills/        # Cursor\n# cp -r research-kit/skills/rk-* ~/.claude/skills/        # Claude Code\n# cp -r research-kit/skills/rk-* ~/.gemini/config/skills/ # Antigravity (Toàn cục IDE)\n# cp -r research-kit/skills/rk-* .agents/skills/          # Antigravity (Dự án)\n# cp -r research-kit/skills/rk-* ~/.agents/skills/        # Universal Agents',
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
          q: 'Research Kit quản lý các công cụ tính toán và biên dịch như thế nào?',
          a: 'Các SOP Markdown cốt lõi chỉ cần agent tương thích. Chèn toán vào slide dùng Pandoc và công cụ chạy bằng thư viện chuẩn Python; kiểm tra slide và bộ skill cũng dùng Python. Vẽ hình dùng renderer đúng định dạng, rồi mở ảnh raster để soi bố cục. Skill yêu cầu sửa và render lại trước khi xác nhận hình đạt; chưa render hoặc chưa mở ảnh để kiểm tra được thì ghi rõ hình chưa được xác minh.',
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
      authorLink: 'Về tác giả',
      authorUrl: 'https://vinhnguyenthanh.com',
    },
    footer: {
      tagline: 'Quy trình nghiên cứu tinh gọn và ranh giới kiểm chứng thực nghiệm cho AI Agent.',
      repo: 'Kho mã nguồn GitHub',
      docs: 'Tài liệu kỹ thuật',
      guides: 'Tài liệu kỹ thuật (Git)',
      guideUrl: 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.vi.md',
      license: 'Giấy phép Apache-2.0',
      issues: 'Báo lỗi / Góp ý',
      authorLink: 'Về tác giả',
      authorUrl: 'https://vinhnguyenthanh.com',
      copy: '© 2026 Research Kit Contributors. Mã nguồn mở theo giấy phép Apache-2.0.',
    },
  },
};
