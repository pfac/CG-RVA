UNAME	=	$(shell uname)
PDFTEX	=	pdflatex --shell-escape -halt-on-error
PDFBLD	=	$(PDFTEX) $(*F).tex > /dev/null
BIBTEX	=	bibtex
BIBBLD	=	-$(BIBTEX) $(*F) > /dev/null
PDFOPN	=	open

DOCS	=	report slides

.PHONY: clean


%.aux: %.tex
	$(PDFBLD)

%.pdf: %.aux %.bbl
	$(PDFBLD)

%.bbl: %.aux
	$(BIBBLD)
	$(PDFBLD)

default:	slides

all: $(DOCS)

report:	report.pdf
	$(PDFOPN) $<

report.pdf:		report/00_abstract.tex
report.pdf:		report/10_intro.tex
report.pdf:		report/20_jsartoolkit.tex
report.pdf:		report/images/basic.png
report.pdf:		report/30_game.tex
report.pdf:		report/31_evolution.tex
report.pdf:		report/32_pokedex.tex
report.pdf:		report/images/marker.png
report.pdf:		report/80_conclusion.tex
report.pdf:		report/91_setup.tex
report.bbl:		references.bib

report/images/marker.png: report/dot/marker.dot
	dot -Tpng -o $@ $<

slides:	slides.pdf
	$(PDFOPN) $<

clean:
	$(RM) *.log *.aux *.toc *.out *.blg *.bbl *.nav *.snm *.synctex.gz
	$(RM) $(DOCS:%=%.pdf)
