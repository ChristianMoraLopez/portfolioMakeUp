import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';
import { useAuth } from '@/hooks/auth'; 
import AppLayout from '@components/Layout';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const { user, update, updatePassword, deleteAccount } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',  
  });
  const [deletePassword, setDeletePassword] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileUpdate = async () => {
    setLoadingProfile(true);
    try {
      const response = await update(profileData);
      setSuccessMessage(response.message || 'Perfil actualizado exitosamente.');
      setErrorMessage('');
      if (response.redirect) {
        router.push(response.redirect);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(`Error: ${error.response.data.error || 'Hubo un error al actualizar el perfil.'}`);
      } else {
        setErrorMessage('Hubo un error al actualizar el perfil.');
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setLoadingPassword(true);
    try {
      const response = await updatePassword({
        current_password: profileData.currentPassword,
        password: profileData.newPassword,
        password_confirmation: profileData.confirmPassword,
      });
      setSuccessMessage(response.message || 'Contraseña actualizada exitosamente.');
      setErrorMessage('');
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500) {
          setErrorMessage('Error interno del servidor. Por favor, intenta nuevamente más tarde.');
        } else {
          setErrorMessage(`Error: ${error.response.data.error || 'Hubo un error al actualizar la contraseña.'}`);
        }
      } else {
        setErrorMessage('Hubo un error al actualizar la contraseña.');
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setErrorMessage('Por favor, ingresa tu contraseña para eliminar la cuenta.');
      return;
    }

    setLoadingDelete(true);
    try {
      await deleteAccount(deletePassword);
      setSuccessMessage('Cuenta eliminada exitosamente.');
      setErrorMessage('');
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 422) {
          setErrorMessage('La contraseña proporcionada es incorrecta.');
        } else if (error.response.status === 500) {
          setErrorMessage('Error interno del servidor. Por favor, intenta nuevamente más tarde.');
        } else {
          setErrorMessage(`Error: ${error.response.data.error || 'Hubo un error al eliminar la cuenta.'}`);
        }
      } else {
        setErrorMessage('Hubo un error al eliminar la cuenta.');
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <AppLayout>
      <Menu className="shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <Menu.Item className="relative flex items-center h-16 lg:justify-between justify-center">
            <span className="text-[#003B4A] text-2xl font-bold flex items-center cursor-pointer">
              {user?.name}&apos;s Profile
            </span>
          </Menu.Item>
        </div>
      </Menu>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          </div>
          <div className="border-t border-gray-200">
            <Form className="px-4 py-5 sm:px-6">
              {loadingProfile && (
                <Dimmer active inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
              )}
              {successMessage && <Message success content={successMessage} />}
              {errorMessage && <Message negative content={errorMessage} />}

              <Form.Field>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Form.Field>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Button primary onClick={handleProfileUpdate} disabled={loadingProfile}>
                {loadingProfile ? 'SAVING...' : 'SAVE'}
              </Button>
            </Form>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Password</h3>
          </div>
          <div className="border-t border-gray-200">
            <Form className="px-4 py-5 sm:px-6">
              {loadingPassword && (
                <Dimmer active inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
              )}
              {successMessage && <Message success content={successMessage} />}
              {errorMessage && <Message negative content={errorMessage} />}

              <Form.Field>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={profileData.currentPassword}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Form.Field>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Form.Field>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Button primary onClick={handlePasswordUpdate} disabled={loadingPassword}>
                {loadingPassword ? 'SAVING...' : 'SAVE'}
              </Button>
            </Form>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
          </div>
          <div className="border-t border-gray-200">
            <Form className="px-4 py-5 sm:px-6">
              {loadingDelete && (
                <Dimmer active inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
              )}
              {successMessage && <Message success content={successMessage} />}
              {errorMessage && <Message negative content={errorMessage} />}

              <Form.Field>
                <label htmlFor="deletePassword" className="block text-sm font-medium text-gray-700">
                  Enter your password to delete account
                </label>
                <input
                  type="password"
                  id="deletePassword"
                  name="deletePassword"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Form.Field>

              <Button negative onClick={handleDeleteAccount} disabled={loadingDelete}>
                {loadingDelete ? 'DELETING...' : 'DELETE ACCOUNT'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
