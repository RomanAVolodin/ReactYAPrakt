describe('Конструктор бургеров', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  beforeEach(function() {
    cy.viewport('macbook-15');
  });

  it('При клике на булку - появляется модальное окно', function() {
    cy.get('[class^=ingredient_ingredient_container__]').first().as('bun');
    cy.get('@bun').find('.title').then(($title) => {
      cy.get('@bun').find('img').click();
      cy.get('[class^=modal_TitleAndClose__]').contains('Детали ингредиента');
      cy.get('[class^=modal-detailed_inner__]').contains($title.text());
    })
    cy.get('[class^=modal_TitleAndClose__]').find('svg').click();
  });

  it('При клике на ингредиент - появляется модальное окно', function() {
    cy.get('[class^=ingredient_ingredient_container__]').last().as('ingredient');
    cy.get('@ingredient').find('.title').then(($title) => {
      cy.get('@ingredient').find('img').click();
      cy.get('[class^=modal_TitleAndClose__]').contains('Детали ингредиента');
      cy.get('[class^=modal-detailed_inner__]').contains($title.text());
    })
    cy.get('[class^=modal_TitleAndClose__]').find('svg').click();
  });

  it('Поместим булку в конструктор кликом', function() {
    cy.get('[class^=ingredient_ingredient_container__]').first().as('bun');
    cy.get('@bun').find('[class^=ingredient_DetailPopup__]').click({force: true});
  });

  it('Перетащить ингредиент в конструктор', function() {
    cy.get('[class^=ingredient_ingredient_container__]').last().as('ingredient');
    cy.get('[class^=burger-constructor_container__]').first().as('constructor');
    cy.get('@ingredient').dragTo('@constructor');
  });

  it('Перетащим вторую булку в конструктор и она заменит первую', function() {
    cy.get('[class^=ingredient_ingredient_container__]').eq(1).as('bun');
    cy.get('[class^=burger-constructor_container__]').first().as('constructor');
    cy.get('@bun').dragTo('@constructor');
  });

  it('Добавим еще 3 ингредиента в конструктор', function() {
    cy.get('[class^=burger-constructor_container__]').first().as('constructor');
    cy.get('[class^=ingredient_ingredient_container__]').eq(2).dragTo('@constructor');
    cy.get('[class^=ingredient_ingredient_container__]').eq(3).dragTo('@constructor');
    cy.get('[class^=ingredient_ingredient_container__]').eq(4).dragTo('@constructor');
  });

  it('Оформить заказ - перемещает на страницу входа', function() {
    cy.get('button').contains('Оформить заказ').click();
  });

  it('Переход на страницу регистрации', function() {
    cy.get('a').contains('Зарегистрироваться').click();
  });

  it('Регистрация пользователя', function() {
    cy.get('input[name=name').type('testuser');
    cy.get('input[name=email').type('rozarioagro@gmail.com');
    cy.get('input[name=password').type('123');
  });

  it('Пользователь уже существует - видим ошибку и переадресация на страницу входа', function() {
    cy.get('button').contains('Зарегистрироваться').click();
    cy.contains('User already exists');
  });

  it('Входим с введенными ранее данными - они должны быть в полях', function() {
    cy.get('button').contains('Войти').click();
  });

  it('На странице конструктора - бургер еще ждет нас, оформляем заказ', function() {
    cy.contains('Соберите бургер');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[class^=modal_ModalWindow__]').contains('Обработка заказа');
  });

});