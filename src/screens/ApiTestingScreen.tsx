import * as React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {
  getWallets,
  type ColorsScheme,
  getCurrencies,
  getNFTs,
  getTransactions,
  getUserContacts,
} from '@aag-development/react-native-metaone-wallet-sdk';
import useColorsAwareObject from '../hooks/useColorsAwareObject';
import {Container} from '../components/Container';
import DropDownPicker from 'react-native-dropdown-picker';

const items = [
  {label: 'GET:Wallets', value: 'GET:Wallets'},
  {label: 'GET:Currencies', value: 'GET:Currencies'},
  {label: 'GET:NFTs', value: 'GET:NFTs'},
  {label: 'GET:Transactions', value: 'GET:Transactions'},
  {label: 'GET:UserContacts', value: 'GET:UserContacts'},
  // { label: 'POST:AddUserContact', value: 'POST:AddUserContact' },
  // { label: 'PUT:UpdateUserContact', value: 'PUT:UpdateUserContact' },
  // { label: 'DELETE:DeleteUserContact', value: 'DELETE:DeleteUserContact' },
];

const ApiTestingScreen: React.FC = () => {
  const styles = useColorsAwareObject(screenStyles);
  const [value, setValue] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  const [responseText, setResponseText] = React.useState<string>();

  const onSelectItem = ({value: changed}: any) => {
    if (changed !== value) {
      setResponseText(undefined);
    }
  };
  const onSubmit = async () => {
    let response: any;
    if (value === 'GET:Wallets') {
      response = await getWallets();
    } else if (value === 'GET:Currencies') {
      response = await getCurrencies();
    } else if (value === 'GET:NFTs') {
      response = await getNFTs();
      console.log('getNFTs', response);
    } else if (value === 'GET:Transactions') {
      response = await getTransactions(
        undefined,
        undefined,
        undefined,
        undefined,
        20,
        0,
      );
    } else if (value === 'GET:UserContacts') {
      response = await getUserContacts();
    }
    setResponseText(response ? JSON.stringify(response) : undefined);
  };
  return (
    <Container>
      <View style={styles.head}>
        <Text style={styles.label}>APIs</Text>
      </View>
      <View style={styles.wrapper}>
        <DropDownPicker
          open={visible}
          setOpen={setVisible}
          value={value}
          setValue={setValue}
          items={items}
          placeholder={'Choose an API'}
          onSelectItem={onSelectItem}
        />
        <Button onPress={onSubmit} disabled={!value} title="SUBMIT" />
        <TextInput
          style={styles.input}
          placeholder="Response"
          multiline
          value={responseText}
        />
      </View>
    </Container>
  );
};

const screenStyles = (colors: ColorsScheme) =>
  StyleSheet.create({
    label: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.black,
      textAlign: 'center',
    },
    text: {
      color: colors.black,
    },
    head: {
      width: '100%',
      paddingVertical: 10,
    },
    wrapper: {
      flex: 1,
      width: '100%',
      gap: 15,
      padding: 20,
    },
    input: {
      color: colors.black,
      padding: 10,
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 4,
      borderColor: colors.black60,
    },
  });

export default ApiTestingScreen;
