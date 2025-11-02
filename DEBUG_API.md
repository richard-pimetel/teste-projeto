# 🔍 Debug API - Erro 400 Bad Request

## ❌ Problema Identificado

**Erro da API**: "Campo obrigatorio não colocado, ou ultrapassagem de cariteres"
**Status Code**: 400 Bad Request

## ✅ Correções Implementadas

### 1. **Validações de Comprimento**
- Nome: máximo 100 caracteres
- Email: máximo 100 caracteres  
- Username: máximo 50 caracteres
- Password: máximo 50 caracteres

### 2. **Múltiplas Estruturas de Dados**

#### Para Cadastro de Usuário:
```javascript
// Estrutura 1: Dados diretos
{
  nome: "João Silva",
  email: "joao@email.com", 
  username: "joao123",
  password: "senha123"
}

// Estrutura 2: Com wrapper
{
  user: {
    nome: "João Silva",
    email: "joao@email.com",
    username: "joao123", 
    password: "senha123"
  }
}

// Estrutura 3: Campos alternativos
{
  nome: "João Silva",
  email: "joao@email.com",
  login: "joao123",    // username → login
  senha: "senha123"    // password → senha
}
```

#### Para Login:
```javascript
// Estrutura 1: username/password
{ username: "joao123", password: "senha123" }

// Estrutura 2: login/senha  
{ login: "joao123", senha: "senha123" }

// Estrutura 3: email/password
{ email: "joao@email.com", password: "senha123" }

// Estrutura 4: email/senha
{ email: "joao@email.com", senha: "senha123" }
```

## 🧪 Como Testar

1. **Abra o Console do Navegador** (F12 → Console)
2. **Tente fazer um cadastro**
3. **Observe os logs detalhados**:
   - Verá cada tentativa de estrutura
   - Qual estrutura funcionou (se alguma)
   - Erros específicos de cada tentativa

## 📋 Logs Esperados

```
Dados originais: {nome: "João", email: "joao@email.com", ...}
Tentativa 1: {nome: "João", email: "joao@email.com", ...}
Estrutura 1 falhou: {messagem: "Campo obrigatorio...", status: false}
Tentando próxima estrutura...
Tentativa 2: {user: {nome: "João", ...}}
Sucesso com estrutura 2: {status: true, ...}
```

## 🎯 Possíveis Soluções

### Se TODAS as estruturas falharem:

1. **Campos Obrigatórios Adicionais**
   - A API pode precisar de campos como: `id`, `status`, `data_criacao`
   - Verificar documentação da API

2. **Validações Específicas**
   - Email deve ser único
   - Username deve ser único
   - Formato de email inválido
   - Senha não atende critérios específicos

3. **Headers HTTP**
   - Pode precisar de headers adicionais
   - Autenticação prévia necessária

## 🔧 Próximos Passos

### Se o problema persistir:

1. **Verificar Documentação da API**
   - Campos obrigatórios exatos
   - Formato esperado dos dados
   - Validações específicas

2. **Testar com Postman/Insomnia**
   - Fazer requisição manual
   - Verificar o que funciona
   - Copiar estrutura que funciona

3. **Adicionar Campos Adicionais**
   ```javascript
   {
     nome: "João Silva",
     email: "joao@email.com",
     login: "joao123",
     senha: "senha123",
     status: "ativo",        // Possível campo obrigatório
     perfil: "usuario",      // Possível campo obrigatório
     data_criacao: new Date().toISOString()
   }
   ```

## 📞 Contato com Back-end

Se você tem acesso ao desenvolvedor do back-end, pergunte:

1. **Qual a estrutura exata esperada?**
2. **Quais campos são obrigatórios?**
3. **Há validações específicas?**
4. **Limites de caracteres por campo?**

---

**Status**: 🔍 **EM INVESTIGAÇÃO**  
**Próximo**: Testar e verificar logs no console
