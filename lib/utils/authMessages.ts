// 인증 관련 에러 메시지 변환 유틸리티

export function getLoginErrorMessage(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }
  if (message.includes('Email not confirmed')) {
    return '이메일 인증이 필요합니다.';
  }
  return message;
}

export function getSignupErrorMessage(message: string): string {
  if (message.includes('User already registered')) {
    return '이미 등록된 이메일입니다.';
  }
  if (message.includes('Password should be at least')) {
    return '비밀번호는 최소 6자 이상이어야 합니다.';
  }
  return message;
}

