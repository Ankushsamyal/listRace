import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';

function HomePageChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! I’m your chatbot. What are you looking for? (e.g., Food, Restaurants, Places)", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const ZOMATO_API_KEY = 'YOUR_RAPIDAPI_ZOMATO_KEY'; 

  const fetchZomatoData = async (query, location) => {
    if (ZOMATO_API_KEY !== 'YOUR_RAPIDAPI_ZOMATO_KEY') {
      try {
        const response = await axios.get( 'https://zomato-api1.p.rapidapi.com/search', {
          headers: {
            'X-RapidAPI-Key': ZOMATO_API_KEY,
            'X-RapidAPI-Host': 'zomato-api1.p.rapidapi.com'
          },
          params: {
            entity_id: 3,
            entity_type: 'city',
            q: query,
            count: 5 
          }
        });
        console.log('Zomato API Response:', response.data);
        if (response.data.restaurants && response.data.restaurants.length > 0) {
          const items = response.data.restaurants.map(rest => `${rest.restaurant.name} - ${rest.restaurant.cuisines} (Rating: ${rest.restaurant.user_rating.aggregate_rating})`);
          return items;
        } else {
          return ['No results found for this query.'];
        }
      } catch (error) {
        console.error('Zomato API Error:', error.response ? error.response.data : error.message);
        return [`Error: ${error.message}. Check your API key or try again.`];
      }
    } else {
      console.log('Using mock data since no API key is set.');
      return [
        `Bademiya - Kebabs & Rolls (Rating: 4.5) - Colaba, ${location}`,
        `Trishna - Seafood (Rating: 4.7) - Fort, ${location}`,
        `Anand Stall - Vada Pav & Dosa (Rating: 4.3) - Vile Parle, ${location}`,
        `The Bombay Canteen - Modern Indian (Rating: 4.8) - Lower Parel, ${location}`,
        `Kyani & Co - Parsi Cafe (Rating: 4.4) - Marine Lines, ${location}`
      ];
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    const lowercaseInput = input.toLowerCase();

    if (!what) {
      if (['food', 'restaurants', 'places'].includes(lowercaseInput)) {
        setWhat(lowercaseInput);
        setMessages(prev => [...prev, { text: `Great! You want ${lowercaseInput}. Where are you looking? (e.g., Mumbai, Bandra)`, sender: "bot" }]);
      } else {
        setMessages(prev => [...prev, { text: `I can help with "Food", "Restaurants", or "Places". What do you want?`, sender: "bot" }]);
      }
    } else if (!where) {
      setWhere(lowercaseInput);
      const query = `${what} in ${lowercaseInput}`;
      console.log('Search Query:', query);
      const results = await fetchZomatoData(what, lowercaseInput);
      setMessages(prev => [
        ...prev,
        { text: `Here’s what I found for ${what} in ${lowercaseInput}:`, sender: "bot", items: results },
        { text: "Want to try something else? Just tell me!", sender: "bot" }
      ]);
    } else {
      setWhat('');
      setWhere('');
      setMessages(prev => [...prev, { text: "Start over! What are you looking for now?", sender: "bot" }]);
    }

    setInput('');
  };

  const ColorButton = styled(Button)(() => ({
    color: 'white',
    size: 'large',
    backgroundColor: '#ff545a',
    '&:hover': {
      backgroundColor: red[700],
    },
    height: '56px',
    marginLeft: '25px'
  }));

  return (
    <Box
      sx={{
        margin: '15vh auto',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        maxWidth: '800px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        Mumbai Food & Places Chatbot
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              margin: '10px 0',
              textAlign: msg.sender === "bot" ? "left" : "right"
            }}
          >
            <Typography
              variant="body1"
              sx={{
                backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#1976d2",
                padding: '10px',
                borderRadius: '8px',
                display: "inline-block",
                color: msg.sender === "bot" ? "black" : "white",
                maxWidth: '70%',
                wordWrap: 'break-word'
              }}
            >
              {msg.text}
            </Typography>
            {msg.items && (
              <List
                sx={{
                  padding: '5px 0 0 20px'
                }}
                dense
              >
                {msg.items.map((item, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      padding: '2px 0'
                    }}
                  >
                    <ListItemText
                      primary={item}
                      sx={{
                        color: msg.sender === "bot" ? "#555" : "#fff"
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type here..."
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: '#1976d2' },
              '&.Mui-focused fieldset': { borderColor: '#1976d2' }
            }
          }}
        />
        <ColorButton
          variant="contained"
          onClick={handleSend}
        >
          Send
        </ColorButton>
      </Box>
    </Box>
  );
}

export default HomePageChatBot;