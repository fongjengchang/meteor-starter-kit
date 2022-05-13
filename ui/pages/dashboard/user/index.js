import React from 'react';
import ReactLoading from 'react-loading';
// @mui
import { Container, Typography, Stack } from '@mui/material';

// graphql & collections
import { useQuery } from "@apollo/react-hooks";

// import queries
import { users as usersQuery } from '../../../_queries/Users.gql'

// components
import Page from '../../../components/Page';
import UserList from './UserList';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------

export default function Users() {

  const  { loading, data, refetch } = useQuery(usersQuery);

  refetch();
 
  const users = data && data.users || [];

  console.log(users);

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading={`Users`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Users' }
          ]}
        />
        {loading ? <ReactLoading className="loading-icons" type={'bars'} color={'grey'} height={30} width={30} /> : 
          <UserList userList={users.users} />
        }
      </Container>
    </Page>
  );
}