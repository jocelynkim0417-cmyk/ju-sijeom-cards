# Source

13 ig-* skills copied unchanged from https://github.com/Jakeschincariol/instagram-agent-skill
(commit d03c56bb598be770c60b201f94237e5d1a4268a6, MIT License, see LICENSE in this folder).

Notes for this project:
- The Python tools (hookscore.py, beats.py, caption.py, humanize.py, detect.py, swipe.py) use the
  standard library only and make no network calls.
- They are tuned for English. Korean lines are not counted as words, so beats.py timings and
  hookscore.py scores are not meaningful for Korean scripts.
- None of the skills post, schedule or send DMs. They only write drafts.
