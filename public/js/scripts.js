const ModalTransaction = {
  dateInput: document.querySelector('#date'),

  open() {
    const today = new Date().toISOString().split('T')[0];
    
    this.dateInput.value = today;
    // this.dateInput.setAttribute('min', today);

    document.querySelector('.modal-overlay.new-transaction').classList.add('active');
    document.querySelector('.modal').classList.add('active');
  },
  close() {
    document.querySelector('.modal-overlay.new-transaction').classList.remove('active');
    document.querySelector('.modal').classList.remove('active');
  }
}

const DOM = {
  balanceCards: [...document.querySelector('#balance-container').children],
  transactionsContainer: document.querySelector('#data-table tbody'),

  showCards() {
    const cards = this.balanceCards;
    
    for (let i = 0; i < cards.length; i++) {
      setTimeout(() => {
        cards[i].classList.add('active');
      }, 100 * i);
    }
  },
}

const App = {
  init() {
    DOM.showCards();
  },
}

App.init();