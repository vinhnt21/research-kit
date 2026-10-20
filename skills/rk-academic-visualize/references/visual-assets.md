# Visual assets for academic slides and figures

Choose a visual for the claim before looking for a file. Data calls for a chart from the underlying values; a process or trust boundary calls for an editable or code-generated diagram; a real specimen or device calls for a verified photograph or specialist illustration. Use an icon only when it helps the audience distinguish a component or action. A concise definition, equation, caveat, or conclusion may remain text-only with a reason in `slide-plan.json`.

## Sources and reuse

| Source | Best use | Acquisition rule |
| --- | --- | --- |
| [Tabler Icons](https://tabler.io/license) | Consistent general icons for computing, process, and security | MIT. Prefer a selected SVG from the [official package](https://github.com/tabler/tabler-icons/blob/main/packages/icons/README.md), pin the package release in the URL, and retain its copyright/license notice with distributed asset copies. Do not bundle the whole library. |
| [BioIcons](https://github.com/duerrsimon/bioicons#credits) | Biology and laboratory objects | License and credit vary by icon. Read the item's metadata; the repository's code license does not cover every image. |
| [NIH BioArt](https://bioart.niaid.nih.gov/terms) | Biomedical and scientific objects | Check the individual entry and its license. Place the required credit directly below the image. |
| [Servier Medical Art](https://smart.servier.com/terms-of-use/) | Medical illustrations | Verify that the selected file is in the CC BY 4.0 medical-image library; credit creator, source, license, and changes. |
| [SciDraw](https://scidraw.io/licensing) | Specialist scientific drawings | Check the specific item's author and license before reuse. |
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia) | Real photographs and context | Use the individual file page for author, license, version, and required attribution. |

Do not build an automatic search, download, or bundled library around [unDraw](https://undraw.co/license); its terms restrict those integrations. Lucide or Phosphor can be manually considered if Tabler lacks a meaningful match, but avoid mixing stroke styles on one deck. Recheck source terms when acquiring an item, because licenses and item pages can change.

Use AI-generated imagery only for a clearly conceptual, non-data metaphor when the destination's policy permits it. Record the provider, prompt/reference, date, and changes in the ledger. Do not synthesize specimen photos, experimental results, charts, or a scientific mechanism that the sources do not establish.

## Selected-asset workflow

1. Match the asset to a `visual.purpose` and source-backed claim. Reject an attractive file with no explanatory role.
2. Retrieve the selected asset from HTTPS. For Tabler, use a release-pinned package URL such as `https://cdn.jsdelivr.net/npm/@tabler/icons@<version>/icons/outline/<name>.svg`; never use `latest` in the reproducible record. For specialist sources, inspect the item page manually and record its own license before retrieval. Do not fetch with credentials or cookies.
3. Save the raw file beside the deck, normally under `assets/raw/`. Record its SHA-256, URL, creator, license, license URL, version or access date, and exact slide use. Cache only files actually selected for the deck.
4. For SVG, check type and size, then run `python3 scripts/sanitize-svg.py assets/raw/icon.svg assets/sanitized/icon.svg` from this skill directory. The tool rejects active content, DTD/entities, unknown elements, event attributes, and external resources. Never render or preview an untrusted raw SVG first.
5. Rasterize the sanitized SVG with an available local renderer at the size needed for projection, save the PNG under `assets/rendered/`, and record the renderer/version and hashes. `python-pptx` inserts the PNG; retain raw and sanitized SVG for audit. If no safe renderer is available, mark the asset unverified and use a native shape or omit it rather than inserting raw SVG.
6. Add the actual credit to the slide or a legible credits slide according to the item's terms. NIH BioArt requires it directly below the image. Verify placement in the exported PDF. Speaker notes may carry the full source and caveat but cannot be the sole visible credit.

## Visual ledger contract

Save `visual-ledger.json` beside the deck when external assets are used. The linter expects an `assets` array. Each entry has a unique `asset_id`; `slide_numbers` are one-based plan positions. Paths are relative to the ledger directory, and the SHA-256 is of the file at `local_path`. Keep other retained raw/sanitized/rendered files in the same deck output and list their hashes in `derivatives` when applicable.

```json
{
  "assets": [
    {
      "asset_id": "tabler-shield",
      "slide_numbers": [4],
      "source_url": "https://cdn.jsdelivr.net/npm/@tabler/icons@<version>/icons/outline/shield.svg",
      "creator": "Tabler Icons",
      "license": "MIT",
      "license_url": "https://tabler.io/license",
      "version_or_accessed": "release version or YYYY-MM-DD access date",
      "changes": "stroke recolored to navy",
      "credit_line": "Shield icon: Tabler Icons, MIT",
      "local_path": "assets/raw/shield.svg",
      "sha256": "64 lowercase hexadecimal characters",
      "format": "svg",
      "derivatives": [
        {"role": "sanitized", "local_path": "assets/sanitized/shield.svg", "sha256": "64 lowercase hexadecimal characters"},
        {"role": "rendered", "local_path": "assets/rendered/shield.png", "sha256": "64 lowercase hexadecimal characters", "renderer": "name and version"}
      ]
    }
  ]
}
```

The example is a shape guide, not a downloadable asset record; replace placeholders with the fetched version and measured hashes. Add `provider`, `prompt_or_reference`, `generated_at`, and `destination_policy` for an AI conceptual image. If an asset is omitted after review, remove its `asset_id` from the slide plan and do not imply it appeared in the deck.

Run `python3 scripts/check-visual-plan.py <slide-plan.json> [visual-ledger.json] --require-visual` on a new deck. The linter checks plan and provenance fields; it cannot determine whether the graphic communicates the science. Render and inspect the final PDF for that judgment, including grayscale and credit visibility. Older plans can run without `--require-visual`.
