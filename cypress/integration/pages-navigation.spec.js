describe('Приложение запущено и работает навигация по страницам', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  beforeEach(function () {
    cy.viewport('macbook-15');
  });

  it('Должны быть на главной странице', function () {
    cy.contains('Соберите бургер');
  });

  it('Навигация на страницу - Лента заказов', function () {
    cy.get('a').contains('Лента заказов').click();
    cy.contains('Выполнено за все время');
  });

  it('Навигация на страницу - Личный кабинет с переадресацией на Логин', function () {
    cy.get('a').contains('Личный кабинет').click();
    cy.contains('Вы - новый пользователь?');
  });

  it('Навигация на страницу - Регистрация', function () {
    cy.get('a').contains('Зарегистрироваться').click();
    cy.contains('Уже зарегистрированы?');
  });

  it('Навигация на страницу - Вход', function () {
    cy.get('a').contains('Войти').click();
    cy.contains('Забыли пароль?');
  });

  it('Навигация на страницу восстановления пароля', function () {
    cy.get('a').contains('Восстановить пароль').click();
    cy.contains('Вспомнили пароль?');
  });
});
