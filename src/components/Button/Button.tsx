import React from 'react';
import { Button } from 'react-native';
import { openWallet } from '@aag-development/react-native-metaone-wallet-sdk';

type OpenSettingsButtonProps = {
  title: string;
  disabled?: boolean;
};

export const OpenWallet = ({ title, disabled }: OpenSettingsButtonProps) => {
  return <Button title={title} onPress={openWallet} disabled={disabled} />;
};
