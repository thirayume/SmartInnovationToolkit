// src/utils/permissions.ts
import { User, UserRole } from '../types';

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  'super_admin': 5,
  'admin': 4,
  'staff': 3,
  'teacher': 2,
  'student': 1
};

export const canApproveUser = (approver: User, userToApprove: User): boolean => {
  // Only super_admin can approve other super_admins
  if (userToApprove.role === 'super_admin') {
    return approver.role === 'super_admin';
  }

  // Only super_admin can approve admins
  if (userToApprove.role === 'admin') {
    return approver.role === 'super_admin';
  }

  // Admin and super_admin can approve staff and teachers
  if (userToApprove.role === 'staff' || userToApprove.role === 'teacher') {
    return approver.role === 'super_admin' || approver.role === 'admin';
  }

  // Admin and super_admin can activate student accounts
  if (userToApprove.role === 'student') {
    return approver.role === 'super_admin' || approver.role === 'admin';
  }

  return false;
};

export const canCreateUser = (creator: User, roleToCreate: UserRole): boolean => {
  const creatorRoleLevel = ROLE_HIERARCHY[creator.role];
  const roleToCreateLevel = ROLE_HIERARCHY[roleToCreate];

  // Cannot create a role higher than or equal to your own
  return creatorRoleLevel > roleToCreateLevel;
};

export const canEditUser = (editor: User, userToEdit: User): boolean => {
  const editorRoleLevel = ROLE_HIERARCHY[editor.role];
  const userToEditRoleLevel = ROLE_HIERARCHY[userToEdit.role];

  // Can edit if your role is higher than the user being edited
  return editorRoleLevel > userToEditRoleLevel;
};

export const canManageClass = (user: User): boolean => {
  return ['super_admin', 'admin', 'teacher'].includes(user.role);
};

export const canManageStudents = (user: User): boolean => {
  return ['super_admin', 'admin', 'teacher'].includes(user.role);
};

export const canAccessAdminPanel = (user: User): boolean => {
  return ['super_admin', 'admin'].includes(user.role);
};