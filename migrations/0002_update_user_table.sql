-- Adicionar novos campos à tabela user
ALTER TABLE "user" 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS login_provider TEXT,
ADD COLUMN IF NOT EXISTS has_mfa BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_first_login BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMP WITH TIME ZONE;

-- Atualizar comentários das colunas
COMMENT ON COLUMN "user".email_verified IS 'Indica se o email do usuário foi verificado';
COMMENT ON COLUMN "user".avatar_url IS 'URL do avatar do usuário';
COMMENT ON COLUMN "user".login_provider IS 'Provedor de autenticação usado pelo usuário';
COMMENT ON COLUMN "user".has_mfa IS 'Indica se o usuário tem autenticação de dois fatores habilitada';
COMMENT ON COLUMN "user".is_banned IS 'Indica se o usuário está banido';
COMMENT ON COLUMN "user".is_locked IS 'Indica se a conta do usuário está bloqueada';
COMMENT ON COLUMN "user".is_first_login IS 'Indica se é o primeiro login do usuário';
COMMENT ON COLUMN "user".last_sign_in_at IS 'Data e hora do último login do usuário'; 