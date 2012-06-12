UNAME	=	$(shell uname)
PDFTEX	=	pdflatex --shell-escape -halt-on-error
PDFBLD	=	$(PDFTEX) $(*F).tex > /dev/null
BIBTEX	=	bibtex
BIBBLD	=	-$(BIBTEX) $(*F) > /dev/null
PDFOPN	=	open

DOCS	=	report

.PHONY: clean


%.aux: %.tex
	$(PDFBLD)

%.pdf: %.aux %.bbl
	$(PDFBLD)

%.bbl: %.aux
	$(BIBBLD)
	$(PDFBLD)

default:	report

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

report/images/marker.png: report/dot/marker.dot
	dot -Tpng -o $@ $<
# report.may.bbl:	report.may.bib
# report.may.pdf:	report.may/00_abstract.tex
# report.may.pdf:	report.may/01_intro.tex
# report.may.pdf:	report.may/03_partitioning.tex
# report.may.pdf:	report.may/04_implementation.tex
# report.may.pdf:	report.may/06_results.tex
# report.may.pdf:	report.may/07_summary.tex
# report.may.pdf:	report.may/071_future.tex
# report.may.pdf:	report.may/89_conclusion.tex
# report.may.pdf:	report.may/90_environment.tex
# report.may.pdf:	report.may/91_methodology.tex
# report.may.pdf:	report.may/images/foz_msh.png
# report.may.pdf:	report.may/images/foz_p2_msh.png
# report.may.pdf:	report.may/images/foz_p4_msh.png

# slides.naps:	slides.naps.pdf
# 	$(PDFOPN) $<

# slides.pfac:	slides.pfac.pdf
# 	$(PDFOPN) $<

# slides.april:	slides.april.pdf
# 	$(PDFOPN) $<

# slides.may:	slides.may.pdf
# 	$(PDFOPN) $<

clean:
	$(RM) *.log *.aux *.toc *.out *.blg *.bbl *.nav *.snm *.synctex.gz
	$(RM) $(DOCS:%=%.pdf)
