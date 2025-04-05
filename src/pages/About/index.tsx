import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const About = () => {
  return (
    <Container sx={{ my: 4, paddingBottom: 2 }} maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Project Description
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          React Application for Displaying a List of Posts and Detailed
          Information.
        </Typography>
        <Typography variant="body1">
          This is a **React** project that uses the public **JSONPlaceholder**
          API. The app displays a list of posts and allows viewing detailed
          information about a selected post.
        </Typography>
        <Typography variant="body1">
          The project uses the following technologies:
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="React"
              secondary="Library for building user interfaces."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Redux Toolkit"
              secondary="Used for centralized state management."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="React Query"
              secondary="For API data fetching, caching, and updates."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Material UI (MUI)"
              secondary="Library of components for building an adaptive and beautiful UI."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Firebase Authentication"
              secondary="Provides secure user management, integrates with Firebase services (like Firestore & Realtime Database), and supports multi-platform login (Web, Android, iOS)."
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Main Features:
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <List>
          <ListItem>
            <ListItemText
              primary="Fetching a list of posts"
              secondary="Using the JSONPlaceholder API (/posts)."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Displaying detailed post information"
              secondary="Requesting by post ID (/posts/{id})."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="UI built with Material UI"
              secondary="Responsive design, theming, components for data display."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="State management with Redux Toolkit"
              secondary="Managing selected post state and caching."
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default About;
