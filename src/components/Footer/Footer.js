/*eslint-disable*/
import React from 'react';
import { Flex, Link, List, ListItem, Text } from '@chakra-ui/react';

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'
    >
      <Text
        color='gray.400'
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        &copy; {1900 + new Date().getYear()},{' '}
        <Text as='span'>
          {document.documentElement.dir === 'rtl'
            ? ' مصنوع من ❤️ بواسطة'
            : 'Made with ❤️ by Digital Garden'}
        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            color='gray.400'
            href='#blog'
            href='https://creative-tim.com/blog'
          >
            Local Farmer
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='gray.400'
            href='#license'
            href='https://www.creative-tim.com/license'
          >
            Wholesale Market
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
