export class Carousel {
  constructor(anterior, proximo, listaProdutos, navegacao) {
    this.anterior = document.querySelector(anterior);
    this.proximo = document.querySelector(proximo);
    this.listaProdutos = document.querySelector(listaProdutos);
    this.navegacao = document.querySelector(navegacao);

    this.slides = this.getListaSlides();
    this.indicadores = this.getListaIndicadores();
    this.tamanhoSlide = this.getTamanhoSlide();
    this.indiceDoSlideAtual = 0;

    this.proximo.addEventListener("click", this.proximoSlide.bind(this));

    this.anterior.addEventListener("click", this.slideAnterior.bind(this));

    this.navegacao.addEventListener("click", this.pularParaSlides.bind(this));
    this.prepararSlides();
  }

  getListaSlides() {
    return Array.from(this.listaProdutos.children);
  }

  getListaIndicadores() {
    return Array.from(this.navegacao.children);
  }

  getTamanhoSlide() {
    return this.slides[0].getBoundingClientRect().width;
  }

  proximoSlide() {
    let proximaPosicao = this.indiceDoSlideAtual + 1;
    if (proximaPosicao > this.slides.length - 1) {
      proximaPosicao = 0;
    }

    this.vaParaSlide(proximaPosicao);
  }

  slideAnterior() {
    let antigaPosicao = this.indiceDoSlideAtual - 1;
    if (antigaPosicao < 0) {
      antigaPosicao = this.slides.length - 1;
    }

    this.vaParaSlide(antigaPosicao);
  }

  getSlideAtual() {
    return this.slides[this.indiceDoSlideAtual];
  }

  getIndiceAtual() {
    return this.indicadores[this.indiceDoSlideAtual];
  }

  vaParaSlide(Posicao) {
    const indicadorAtual = this.getIndiceAtual();
    this.indiceDoSlideAtual = Posicao;
    const indicadorSelecionado = this.getIndiceAtual();
    this.scrollParaSlide(this.getSlideAtual());
    this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);
  }

  scrollParaSlide(slideSelecionado) {
    this.listaProdutos.style.transform =
      "translateX(-" + slideSelecionado.style.left + ")";
  }

  atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
    indicadorAtual.classList.remove("carousel__indicador--ativo");
    indicadorSelecionado.classList.add("carousel__indicador--ativo");
  }

  pularParaSlides(evento) {
    if (evento.target === evento.currentTarget) return;

    const indicadorSelecionado = evento.target.getAttribute("data-indicador");
    this.vaParaSlide(parseInt(indicadorSelecionado));
  }

  prepararSlides() {
    this.slides.forEach((slide, i) => {
      slide.style.left = this.tamanhoSlide * i + "px";
    });
  }
}
