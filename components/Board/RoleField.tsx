'use client';

import styles from './RoleField.module.scss';

interface RoleFieldProps {
  roles: string[];
  onChange: (roles: string[]) => void;
}

export default function RoleField({ roles, onChange }: RoleFieldProps) {
  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    onChange(newRoles);
  };

  const handleAddRole = () => {
    onChange([...roles, '']);
  };

  const handleRemoveRole = (index: number) => {
    const newRoles = roles.filter((_, i) => i !== index);
    onChange(newRoles.length > 0 ? newRoles : ['']);
  };

  return (
    <div>
      <label className={styles.label}>역할</label>
      <div className={styles.roleInputs}>
        {roles.map((role, index) => (
          <div key={index} className={styles.roleInputWrapper}>
            <input
              type="text"
              value={role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              placeholder="본인의 역할을 입력하세요"
              className={styles.roleInput}
            />
            {roles.length > 1 && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveRole(index)}
                aria-label="역할 제거"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddRole}
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        역할 추가
      </button>
    </div>
  );
}
