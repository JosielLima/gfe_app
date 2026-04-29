# Resumo do Projeto

Neste desafio, você desenvolverá uma interface de autenticação de usuário responsiva e segura que permite aos usuários se registrarem e fazerem login usando e-mail e senha. Você deve construí-la com os designs fornecidos para desktop, tablet e dispositivos móveis.

Esboçamos meticulosamente todas as especificações necessárias para construir seu próprio mecanismo de autenticação manualmente. Embora difícil, este desafio foi projetado para lhe dar uma compreensão mais profunda dos fluxos de autenticação.

> [!TIP]
> Se desejar, você também pode integrar-se a um serviço de autenticação externo para completar este exercício, o que é praticamente útil para seus projetos do mundo real. Completar o exercício manualmente uma vez e depois repeti-lo com integração também reforçará o que você aprendeu por meio do desenvolvimento prático.

---

## Requisitos Funcionais

### 1. Campo de senha
- Este campo deve mascarar a entrada da senha por padrão, exibindo caracteres como asteriscos.
- Ele também deve incluir um ícone de alternância de visibilidade que alterna a exibição da senha entre mascarada e texto simples.

### 2. Cadastro (Sign Up)
#### Validação de e-mail no lado do cliente
- **Obrigatório**: No envio, certifique-se de que o campo de e-mail não seja deixado em branco. Caso contrário, exiba "O endereço de e-mail é obrigatório.".
- **Verificação de formato**: Valide se o e-mail inserido corresponde ao formato padrão de e-mail (ex: usuario@exemplo.com), fornecendo feedback quando o campo for preenchido e perder o foco (blur). Caso contrário, exiba "Por favor, insira um endereço de e-mail válido.".

#### Validação de senha no lado do cliente
- **Verificação de complexidade em tempo real**: Valide se a senha inserida atende aos requisitos em tempo real, verificando cada um deles:
  - **Critérios**:
    - 8 - 64 caracteres
    - Pelo menos uma letra maiúscula
    - Pelo menos uma letra minúscula
    - Pelo menos um número
    - Pelo menos um caractere especial (ex: ! @ # $ % ^ & *)
- **Ícones de verificação**: Implemente ícones de verificação nos estados ativo e normal. Quando um requisito de senha for atendido, o ícone deve ser alterado do estado normal para o ativo.
- **No envio**: Se os requisitos de formato não forem atendidos, exiba "A senha deve conter [critérios (minúsculo)]"
- **Obrigatório**: No envio, o campo não deve estar vazio, exiba "A senha é obrigatória"

#### Validação de caixa de seleção (checkbox) obrigatória
- **Termos de serviço**: Verifique se o usuário marcou a caixa de seleção de concordância com os Termos de Serviço. Caso contrário, exiba uma notificação de toast de erro informando "Você deve concordar com os Termos de Serviço para criar uma conta."

#### Validação no lado do servidor
- **Mesmas verificações**: Repita as verificações acima no lado do servidor para garantir a consistência.
- **A conta já existe**: Verifique se o e-mail já existe no banco de dados. Se sim, mostre uma notificação de toast de erro informando "A conta já existe. Deseja fazer login?"
- **[Meta extra] Validação de domínio**: Verifique se o nome de domínio do e-mail tem um registro MX (Mail Exchange) válido. Caso contrário, exiba "Este e-mail não existe".

### 3. Login (Sign In)
#### Validação no lado do cliente
- **Obrigatório**: No envio, os campos não devem estar vazios, exiba "E-mail é obrigatório" / "Senha é obrigatória".

#### Validação de credenciais de login
- **Recuperar**: No envio, recupere as credenciais armazenadas (senha com hash e salt, se usado) associadas ao e-mail fornecido no banco de dados.
- **Verificar**: A senha fornecida pelo usuário é submetida a hash usando a mesma função de hash e salt (si aplicável) que a senha armazenada. Esse valor com hash é então comparado com a senha armazenada com hash.
- **Seguro**: Previna ataques de injeção de SQL usando consultas parametrizadas ou declarações preparadas (prepared statements).
- **Se a autenticação falhar**: Forneça uma mensagem de erro genérica sem revelar se uma conta já existe via uma notificação de toast de erro: "E-mail ou senha incorretos.".

### 4. Gerenciamento de Sessão
- **Manipulação de token**: Crie um token de sessão que seja criptograficamente seguro e gerado aleatoriamente para evitar ataques de sequestro de sessão e fixação.
- **Armazenar no navegador**: Armazene esse token como um cookie no navegador do usuário com atributos `HttpOnly`, `Secure`, `SameSite` e com expiração de sessão.
- **Redirecionamento pós-registro**:
  - **Lado do servidor**: O redirecionamento deve acontecer no lado do servidor (HTTP 302).
  - **Específico do usuário**: Recupere informações do servidor usando o token para exibir "Bem-vindo de volta, [email do usuário]".

### 5. Armazenamento de Dados e Segurança
- **Criptografia de dados**: Use opções integradas no banco de dados para criptografar colunas sensíveis.
- **Chaves de segurança**: Armazene as chaves de criptografia separadamente dos dados (ex: KMS).
- **Criptografia em trânsito**: Conexões com o banco de dados devem usar TLS.
- **Strings de conexão**: Devem incluir parâmetros de criptografia e não conter credenciais expostas.

#### Armazenamento Seguro
- **Hash de senha**: Use algoritmos fortes como bcrypt, Argon2 ou PBKDF2.
- **Salt de senha**: Adicione salt aos hashes para evitar ataques de rainbow table.
- **E-mails case-insensitive**: Converta todos os e-mails para minúsculas antes de armazenar e comparar.
- **Armazenamento de sessão**: Armazene em banco de dados ou Redis (com conexões criptografadas).

---

## Requisitos Gerais

- **Fidelidade do design**: Siga o design o mais fielmente possível (cores, fontes, espaçamento, dimensões).
- **Interatividade**:
  - **Toast notification**: Exiba mensagens de erro globais.
  - **Checkbox**: Implemente estados normal, foco e desabilitado.
  - **Botões/Links**: Estilize estados normal, hover, foco e desabilitado.
  - **Campos de entrada**: Estilize estados normal, foco, preenchido, desabilitado e erro.
- **Compatibilidade**: Verifique nos principais navegadores (Chrome, Firefox, Safari).
- **[Meta extra] Otimização**: Desenvolva para tempos de carregamento rápidos.
- **[Meta extra] Acessibilidade**: Use HTML semântico, funções ARIA e tags alt adequadas.
