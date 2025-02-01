import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";
import {
  Search,
  UserPlus,
  Edit2,
  Mail,
  Trash2,
  MailCheck,
  UserCheck,
  HelpCircle,
  Key,
  UserX,
  CheckCircle,
  RotateCcw
} from "lucide-react";
import { toast } from "react-hot-toast";
import { User, UserRole } from "../types/models";
import { Spinner } from "../components/ui/spinner";
import {
  TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { UserService } from "../services/mockService";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

interface RoleSelectorProps {
  currentRole: UserRole;
  onChange: (role: UserRole) => void;
  disabled: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <Select
      value={currentRole}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('common.labels.select')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="super_admin">{t('common.roles.admin')}</SelectItem>
        <SelectItem value="teacher">{t('common.roles.teacher')}</SelectItem>
        <SelectItem value="student">{t('common.roles.student')}</SelectItem>
        <SelectItem value="staff">{t('common.roles.staff')}</SelectItem>
      </SelectContent>
    </Select>
  );
};

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const canManageUser = (targetUser: User) => {
    if (!currentUser) return false;
    if (currentUser.roles.includes('super_admin')) return true;
    if (targetUser.roles.includes('super_admin')) return false;
    if (currentUser.roles.includes('admin')) return true;
    if (currentUser.roles.includes('staff')) {
      return targetUser.createdByUserId === currentUser.userId;
    }
    return false;
  };

  const handleAddUser = () => {
    setSelectedUser(null);
  };

  const handleEditUser = (user: User) => {
    if (user.roles.includes('super_admin')) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }
    setSelectedUser(user);
  };

  const handleResendVerification = async (userId: number) => {
    const user = users.find(u => u.userId === userId);
    if (!user || user.roles.includes('super_admin')) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update the user's email verification status in the mock data
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId
            ? {
                ...user,
                emailVerified: false,
                emailVerifiedAt: null,
              }
            : user
        )
      );

      toast.success(t('users.messages.resendVerificationSuccess'));
    } catch (error) {
      console.error('Error resending verification:', error);
      toast.error(t('common.messages.error'));
    }
  };

  const handleForceChangePassword = async (userId: number) => {
    const user = users.find(u => u.userId === userId);
    if (!user || user.roles.includes('super_admin')) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement API call to send password reset email with OTP
      toast.success(t('users.messages.forceChangePasswordSuccess'));
    } catch (error) {
      toast.error(t('common.messages.error'));
    }
  };

  const handleChangeRole = async (userId: number, newRole: UserRole) => {
    const user = users.find(u => u.userId === userId);
    if (!user || user.roles.includes('super_admin')) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    if (!canManageUser(user)) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId
            ? { ...user, roles: [newRole] }
            : user
        )
      );
      toast.success(t('users.messages.roleChangeSuccess'));
    } catch (error) {
      toast.error(t('common.messages.error'));
    }
  };

  const handleToggleStatus = async (userId: number) => {
    const targetUser = users.find(u => u.userId === userId);
    if (!targetUser || targetUser.roles.includes('super_admin')) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    if (!canManageUser(targetUser)) {
      toast.error(t('users.messages.notAuthorized'));
      return;
    }

    setActionDialog({
      isOpen: true,
      title: t('users.messages.statusChangeTitle'),
      description: t('users.messages.statusChangeDescription'),
      onConfirm: async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setUsers((prev) =>
            prev.map((user) =>
              user.userId === userId
                ? {
                    ...user,
                    isActive: !user.isActive,
                    adminVerified: user.isActive ? false : user.adminVerified
                  }
                : user
            )
          );
          toast.success(t('users.messages.statusChangeSuccess'));
        } catch (error) {
          toast.error(t('common.messages.error'));
        }
        setActionDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleVerifyEmail = async (userId: number) => {
    setActionDialog({
      isOpen: true,
      title: t("users.messages.verifyEmailTitle"),
      description: t("users.messages.verifyEmailDescription"),
      onConfirm: async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setUsers((prev) =>
            prev.map((user) =>
              user.userId === userId
                ? {
                    ...user,
                    emailVerified: true,
                    emailVerifiedAt: new Date(),
                  }
                : user
            )
          );
          toast.success(t("users.messages.verifyEmailSuccess"));
        } catch (error) {
          toast.error(t("common.messages.error"));
        }
        setActionDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleUnverifyEmail = async (userId: number) => {
    setActionDialog({
      isOpen: true,
      title: t("users.messages.unverifyEmailTitle"),
      description: t("users.messages.unverifyEmailDescription"),
      onConfirm: async () => {
        try {
          // For mock data:
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setUsers((prev) =>
            prev.map((user) =>
              user.userId === userId
                ? {
                    ...user,
                    emailVerified: false,
                    emailVerifiedAt: null,
                  }
                : user
            )
          );
          // For real API:
          // await api.users.unverifyEmail(userId);
          toast.success(t("users.messages.unverifyEmailSuccess"));
        } catch (error) {
          toast.error(t("common.messages.error"));
        }
        setActionDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${selectedUser.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Refresh the users list
      const updatedUsers = users.map(user => 
        user.userId === selectedUser.userId ? selectedUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSelectedUser(null);
      toast({
        title: t("common.messages.success"),
        description: t("users.messages.userUpdated"),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: t("common.messages.error"),
        description: t("users.messages.updateError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers.filter(user => !user.isDeleted));
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(t('common.messages.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [t]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchString = searchTerm.toLowerCase();
      const fullName = `${user.title} ${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const phone = user.phone.toLowerCase();
      
      return (
        fullName.includes(searchString) ||
        email.includes(searchString) ||
        phone.includes(searchString)
      );
    });
    
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleToggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteUsers = async (userIds: number[]) => {
    // Don't allow deletion of super_admin or admin
    const usersToDelete = users.filter(user => 
      userIds.includes(user.userId) && 
      !user.roles.includes('super_admin') && 
      !user.roles.includes('admin')
    );

    if (usersToDelete.length === 0) {
      toast.error(t('users.messages.cannotDeleteAdmins'));
      return;
    }

    setActionDialog({
      isOpen: true,
      title: t('users.messages.deleteTitle', { count: usersToDelete.length }),
      description: t('users.messages.deleteDescription', { count: usersToDelete.length }),
      onConfirm: async () => {
        try {
          // Implement API call to delete users
          toast.success(t('users.messages.deleteSuccess', { count: usersToDelete.length }));
          // Refresh user list
        } catch (error) {
          toast.error(t('common.messages.error'));
        }
      }
    });
  };

  const handleRestoreUser = async (userId: number) => {
    try {
      await UserService.restoreUser(userId);
      const fetchedUsers = await UserService.getAllUsers();
      setUsers(fetchedUsers.filter(user => !user.isDeleted));
      toast.success(t('users.messages.restoreSuccess'));
    } catch (error) {
      toast.error(t('common.messages.error'));
    }
  };

  if (!currentUser?.roles || !(['super_admin', 'admin', 'staff'] as UserRole[]).some(role => currentUser.roles.includes(role))) {
    return <div>{t('users.messages.notAuthorized')}</div>;
  }

  if (isLoading && users.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("users.title")}</CardTitle>
        <CardDescription>{t("users.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("common.search")}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setShowInactive(!showInactive)}
                  >
                    {showInactive ? <UserCheck /> : <HelpCircle />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showInactive ? t("users.messages.showInactive") : t("users.messages.hideInactive")}
                </TooltipContent>
              </TooltipRoot>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            {selectedUsers.length > 0 && (
              <TooltipProvider>
                <TooltipRoot>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUsers(selectedUsers)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t("users.messages.deleteSelected")}
                  </TooltipContent>
                </TooltipRoot>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button onClick={handleAddUser}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("users.messages.add")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {t("users.messages.addTooltip")}
                </TooltipContent>
              </TooltipRoot>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="p-4">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers(filteredUsers.map(u => u.userId));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="p-4">{t("users.table.name")}</th>
                <th className="p-4">{t("users.table.email")}</th>
                <th className="p-4">{t("users.table.phone")}</th>
                <th className="p-4">{t("users.table.status")}</th>
                <th className="p-4">{t("users.table.verifications")}</th>
                <th className="p-4">{t("users.table.role")}</th>
                <th className="p-4">{t("users.table.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className={!user.isActive ? "bg-muted/50" : ""}>
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers.includes(user.userId)}
                      onCheckedChange={() => handleToggleUserSelection(user.userId)}
                      disabled={user.roles.includes('super_admin') || user.roles.includes('admin')}
                    />
                  </td>
                  <td className="p-4">
                    {user.title} {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? t("users.status.active") : t("users.status.inactive")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant={user.emailVerified ? "default" : "outline"}
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleResendVerification(user.userId)}
                              disabled={user.roles.includes('super_admin')}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("users.messages.resendVerification")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>

                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant={user.emailVerified ? "default" : "outline"}
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleVerifyEmail(user.userId)}
                              disabled={user.emailVerified || user.roles.includes('super_admin')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("users.messages.verifyEmail")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>

                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant={!user.emailVerified ? "default" : "outline"}
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleUnverifyEmail(user.userId)}
                              disabled={!user.emailVerified || user.roles.includes('super_admin')}
                            >
                              <MailCheck className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("users.messages.unverifyEmail")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>
                    </div>
                  </td>
                  <td className="p-4">
                    <RoleSelector
                      currentRole={user.roles[0] as UserRole}
                      onChange={(role) => handleChangeRole(user.userId, role)}
                      disabled={!canManageUser(user) || user.roles.includes('super_admin')}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleEditUser(user)}
                              disabled={user.roles.includes('super_admin')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("users.messages.edit")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>

                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleForceChangePassword(user.userId)}
                              disabled={user.roles.includes('super_admin')}
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("users.messages.forceChangePassword")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>

                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <Button
                              variant={user.isActive ? "default" : "outline"}
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleToggleStatus(user.userId)}
                              disabled={user.roles.includes('super_admin')}
                            >
                              {user.isActive ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <UserX className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {user.isActive
                              ? t("users.messages.deactivate")
                              : t("users.messages.activate")}
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>

                      {canManageUser(user) && (
                        <>
                          {user.isDeleted ? (
                            <TooltipProvider>
                              <TooltipRoot>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleRestoreUser(user.userId)}
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("users.messages.restore")}
                                </TooltipContent>
                              </TooltipRoot>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <TooltipRoot>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleDeleteUsers([user.userId])}
                                    disabled={user.roles.includes('super_admin') || user.roles.includes('admin')}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {t("users.messages.delete")}
                                </TooltipContent>
                              </TooltipRoot>
                            </TooltipProvider>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {selectedUser && (
        <Dialog 
          open={!!selectedUser} 
          onOpenChange={(open) => !open && setSelectedUser(null)}
        >
          <DialogHeader>
            <DialogTitle>{t("users.messages.editUser")}</DialogTitle>
            <DialogDescription>
              {t("users.messages.editUserDescription")}
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  {t("users.messages.title")}
                </Label>
                <Input
                  id="title"
                  value={selectedUser.title || ""}
                  className="col-span-3"
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev!,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  {t("users.messages.role")}
                </Label>
                <div className="col-span-3">
                  <RoleSelector
                    currentRole={selectedUser.roles[0]}
                    onChange={(role) =>
                      setSelectedUser((prev) => ({
                        ...prev!,
                        roles: [role],
                      }))
                    }
                    disabled={!currentUser?.roles.includes('super_admin')}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              {t("common.messages.cancel")}
            </Button>
            <Button onClick={handleSubmit}>
              {t("common.messages.save")}
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      <ActionDialog
        isOpen={actionDialog.isOpen}
        onClose={() => setActionDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={actionDialog.onConfirm}
        title={actionDialog.title}
        description={actionDialog.description}
      />
    </Card>
  );
};

export default UserManagement;
