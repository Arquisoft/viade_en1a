  Feature: Logearse

Scenario: Iniciando sesión
  Given Soy un usuario intentando iniciar sesión
  When  introduzco mi webId
  And   relleno el formulario
  Then nos redirige a la página de bienvenida