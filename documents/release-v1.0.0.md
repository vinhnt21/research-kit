# Research Kit v1.0.0

Bản public đầu tiên của Research Kit: bộ quy trình nghiên cứu tinh gọn cho AI agent (Cursor, Claude Code, Codex, Antigravity). Agent được dẫn qua từng giai đoạn của một bài báo. Quyết định khoa học vẫn thuộc về nhà nghiên cứu.

Giấy phép: [Apache-2.0](../LICENSE).

## Cài đặt

```bash
npx skills add vinhnt21/research-kit
```

Hoặc cài theo agent:

```bash
gh skill install vinhnt21/research-kit --agent cursor
```

Handbook: [`documents/guide.md`](guide.md) · [`documents/guide.vi.md`](guide.vi.md) · [Docs](https://research-kit.vinhnguyenthanh.com/docs)

---

## Bản này gồm gì

**10 skill.** Sáu skill cốt lõi đi hết vòng đời một bài báo. Bốn module chuyên ngành phản ánh hướng nghiên cứu của tác giả và có thể bỏ qua, chỉnh, hoặc thay.

| Skill | Vai trò trong v1 |
| :--- | :--- |
| `rk-survey` | Khóa phạm vi tìm kiếm, kiểm tra trích dẫn và bài rút, lập bản đồ bằng chứng |
| `rk-idea` | Đặt câu hỏi, đối thủ giải thích, tiêu chí làm yếu giả thuyết, quyết định pursue / kill |
| `rk-method` | Chọn thiết kế, đối chứng, mục tiêu độ chính xác, đóng băng giao thức trước khi chạy đầy đủ |
| `rk-data` | Đọc dữ liệu thô, chọn cách phân tích, hình, và chạy lại từ dữ liệu gốc trước khi công bố số |
| `rk-write` | Bản thảo từng luận điểm một, đối soát claim–evidence, bản nháp trả lời phản biện |
| `rk-report` | Báo cáo tiến độ và thuyết trình chỉ từ kết quả đã kiểm |
| `rk-quantum` | Mô phỏng lượng tử cục bộ; chạy QPU phải được người dùng cho phép |
| `rk-quantum-network` | Hợp đồng dịch vụ mạng lượng tử: entanglement, repeater, bộ nhớ, định tuyến |
| `rk-ai` | Tách tập, rò rỉ dữ liệu, baseline, seed, đánh giá mô hình học |
| `rk-academic-visualize` | Sơ đồ bài báo (TikZ, Mermaid, SVG) và slide bám nguồn |

Đi kèm mỗi skill là ghi chú thao tác (`references/`) và mẫu hiện trường (`assets/`), nạp khi skill đó được gọi. Metadata đứng của 10 mô tả chiếm dưới 1.000 token (dưới 0,50% cửa sổ 200k). Phần token thực tế còn phụ thuộc tác vụ, file được nạp, và agent.

Quy trình cốt lõi là Markdown. Research Kit không nhúng thư viện thống kê, solver, hay wrapper API. Lệnh chạy thí nghiệm thuộc về mã và thư viện của từng bài.

`python3 scripts/check-suite.py` kiểm tra cấu trúc skill, frontmatter, và liên kết trong repo. Đây là công cụ của người bảo trì, không phải runtime cài vào agent.

---

## Hạn chế của v1

Những giới hạn này là phạm vi cố ý của bản đầu, không phải lỗi chờ vá trong ngày phát hành.

1. **Không viết hộ và không nộp bài hộ.** Research Kit là quy trình cho từng việc có ranh giới. Giả thuyết, diễn giải, và trách nhiệm luận điểm thuộc về người làm nghiên cứu. `rk-write` soạn bản nháp và bản trả lời phản biện để tác giả sửa; skill không liên hệ ban biên tập và không nộp manuscript.

2. **Cổng kiểm là quy trình, không phải máy chặn ảo giác.** `rk-survey` yêu cầu đối chiếu định danh và nguồn đã mở. Nếu agent bỏ qua cổng đó, bộ skill không tự bịt trích dẫn bịa. Một bài systematic review chỉ được gọi bằng tên đó khi giao thức tìm kiếm đã được ghi trước; v1 không cấp chứng nhận PRISMA.

3. **Nền phương pháp và thống kê còn mỏng.** v1 có cổng thiết kế, đóng băng giao thức, và ghi lại phân tích. v1 chưa đi sâu lựa chọn phương pháp, độ mạnh và độ chính xác, thiên lệch, độ hiệu lực, giả định của phép kiểm, effect size, và cách đọc khoảng không chắc. Các công thức solver nằm ngoài skill.

4. **Bốn module chuyên ngành không phải catalog mọi lĩnh vực.** Lượng tử, mạng lượng tử, học máy, và hình minh họa học thuật là phần mở rộng của tác giả. Sáu skill cốt lõi là quy trình thực nghiệm chung và cần chỉnh theo ngành. v1 không có giao thức thí nghiệm ướt, lâm sàng, hay đối tượng người ngoài các cổng thực nghiệm chung.

5. **Hai gói chuyên ngành được giữ ổn định, chưa cùng độ sâu với lõi.** `rk-quantum-network` là một `SKILL.md`, chưa có `references/` và `assets/`. `rk-academic-visualize` mang template trình bày và script kiểm slide của tác giả; đó là ngoại lệ so với các skill còn lại, vốn không kèm script thực thi.

6. **Mô phỏng không phải đo trên thiết bị.** Kết quả `rk-quantum` và `rk-quantum-network` là bằng chứng cho mô hình đã ghi. Số mô phỏng không chứng minh phần cứng sẽ lặp lại kết quả, và không chứng minh lợi thế lượng tử vô điều kiện.

7. **Không khóa layout repo và không thay hệ thống lab.** Nhiều bài trong một repo được tách bằng khai báo Active Paper và ranh giới bằng chứng. v1 không ép cây thư mục, không hook git, không nền tảng tiền đăng ký giao thức, và không sổ lab.

8. **Con số context là metadata đứng.** Mức dưới 0,50% đo phần `name` và `description` được nạp sẵn. Đọc handbook, PDF, hay dữ liệu vẫn tốn context như mọi phiên làm việc khác.

---

## Định hướng sau v1

Lộ trình giữ trần 10 skill. Kỹ thuật mới chỉ vào lõi khi làm sâu nghiên cứu mà không thêm nhánh chọn skill.

1. **Củng cố nền phương pháp** trong `rk-method` và `rk-idea`: thiết kế, lựa chọn phương pháp, power và precision, thiên lệch, độ hiệu lực.
2. **Bổ sung suy luận thống kê** trong `rk-data`: chọn phép kiểm, giả định, effect size, độ không chắc, và cách diễn giải.
3. **Siết kiểm chứng và chạy lại:** nguồn gốc số liệu, dị thường, rerun sạch, và đối soát claim–evidence trước khi một câu được đưa vào bài hoặc slide.
4. **Giữ người trong vòng quyết định.** Câu hỏi, phương pháp, kiểm bằng chứng, và kết luận không được chuyển thành lựa chọn tự động của agent.

Góp ý và báo lỗi: [GitHub Issues](https://github.com/vinhnt21/research-kit/issues).

---

# Research Kit v1.0.0

First public release. Research Kit is a lean set of research procedures for AI agents (Cursor, Claude Code, Codex, Antigravity). The agent is guided through one stage of a paper at a time. Scientific decisions stay with the researcher.

License: [Apache-2.0](../LICENSE).

## Install

```bash
npx skills add vinhnt21/research-kit
```

```bash
gh skill install vinhnt21/research-kit --agent cursor
```

Handbook: [`documents/guide.md`](guide.md) · [Docs](https://research-kit.vinhnguyenthanh.com/docs)

## What ships

**10 skills.** Six cover the paper lifecycle. Four domain modules match the author’s research focus and can be skipped, adapted, or replaced.

| Skill | Role in v1 |
| :--- | :--- |
| `rk-survey` | Lock the search boundary, check citations and retractions, map evidence |
| `rk-idea` | Frame the question, rivals, weakening results, and a pursue / kill decision |
| `rk-method` | Choose the design, comparator, precision target, and freeze the protocol before a full run |
| `rk-data` | Inspect raw data, choose the analysis, plot, and rerun from raw inputs before a number is claimed |
| `rk-write` | Draft one claim at a time, align claims with evidence, draft reviewer replies |
| `rk-report` | Progress briefings and talks from verified outputs only |
| `rk-quantum` | Local quantum simulation; QPU spend needs explicit approval |
| `rk-quantum-network` | Quantum-network service contract: entanglement, repeaters, memory, routing |
| `rk-ai` | Splits, leakage, baselines, seeds, and learned-model evaluation |
| `rk-academic-visualize` | Paper figures (TikZ, Mermaid, SVG) and source-grounded slides |

Companion notes (`references/`) and field templates (`assets/`) load only when that skill is used. The ten standing descriptions use fewer than 1,000 tokens (under 0.50% of a 200k window). Tokens spent on the task, opened files, and the agent are separate.

Core procedures are Markdown. Research Kit does not bundle statistical libraries, solvers, or API wrappers. Experiment commands belong to each paper’s own code.

`python3 scripts/check-suite.py` checks skill layout, frontmatter, and links in this repository. It is a maintainer check, not an agent runtime.

## Limitations of v1

These bounds are the intended scope of the first public release.

1. **It does not write or submit the paper.** Procedures cover bounded tasks. Hypotheses, interpretation, and responsibility for claims stay with the researcher. `rk-write` drafts prose and replies for authors to revise. It does not contact an editor or file a manuscript.

2. **Gates are procedures, not a hallucination block.** `rk-survey` requires opened sources and resolved identifiers. If the agent skips that gate, the kit does not independently stop a fabricated citation. A systematic-review label applies only when a search protocol was written before screening. v1 does not certify PRISMA compliance.

3. **Method and statistics stay thin.** v1 records a design gate, a protocol freeze, and an analysis record. It does not yet go deep on method choice, power and precision, bias, validity, test assumptions, effect sizes, or how to read uncertainty. Solver formulas stay outside the skills.

4. **The four domain modules are not a catalog of every field.** Quantum computing, quantum networking, machine learning, and academic figures are the author’s extensions. The six core skills are a general empirical workflow and still need field-specific adaptation. v1 has no wet-lab, clinical, or human-subjects protocol pack beyond those general gates.

5. **Two specialist packages are stable references and are not as deep as the core.** `rk-quantum-network` is a single `SKILL.md`, without `references/` or `assets/`. `rk-academic-visualize` includes the author’s slide template and a deck-check script. The other skills ship no execution scripts.

6. **A simulation is not a device measurement.** `rk-quantum` and `rk-quantum-network` support the recorded model. Those numbers do not show that hardware will reproduce them, and they do not establish unconditional quantum advantage.

7. **No forced lab system.** Multiple papers in one repo are separated by an Active Paper declaration and an evidence boundary. v1 does not impose a directory tree, git hooks, a pre-registration platform, or a lab notebook.

8. **The context figure is standing metadata only.** The figure under 0.50% is the preloaded `name` and `description` text. Reading the handbook, PDFs, or data still uses context.

## After v1

The ceiling stays at 10 skills. A technique enters the core only when it deepens the research without adding another routing choice.

1. **Method foundations** in `rk-method` and `rk-idea`: design, method choice, power and precision, bias, and validity.
2. **Statistical reasoning** in `rk-data`: test selection, assumptions, effect sizes, uncertainty, and interpretation.
3. **Tighter verification:** provenance, anomalies, clean reruns, and claim-to-evidence checks before a sentence enters the paper or the slides.
4. **Human decisions stay human.** Questions, methods, evidence checks, and conclusions are not handed to the agent as an automatic choice.

Issues: [GitHub Issues](https://github.com/vinhnt21/research-kit/issues).
