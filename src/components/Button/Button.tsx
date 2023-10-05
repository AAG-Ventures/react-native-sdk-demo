import React from 'react';
import { Button } from 'react-native';
import { openWallet } from '@aag-development/react-native-metaone-wallet-sdk';
import { useToast } from 'react-native-toast-notifications';

type OpenSettingsButtonProps = {
  title: string;
  disabled?: boolean;
};

export const OpenWallet = ({ title, disabled }: OpenSettingsButtonProps) => {
  const toast = useToast()
  const handleOpenWallet = async () => {
    try {
      await openWallet()
    } catch (error) {
      console.log(error)
    }
  }
  return <Button title={title} onPress={handleOpenWallet} disabled={disabled} />;
};
