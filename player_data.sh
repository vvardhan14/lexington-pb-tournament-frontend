#!/bin/bash

# Base URL (change to https://lexington-pb-tournament-backend.onrender.com for production)
BASE_URL="http://localhost:5000"

# Step 1: Purge existing data
echo "Purging existing data..."
curl -X DELETE -H "x-user: admin" $BASE_URL/api/purge

# Step 2: Create 24 players from Tab 2 - Team Names
echo "Creating players..."
# Pool A Teams 1–6
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Vishnu\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Ram Prasad\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Gopal S\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Suresh P\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Sree J\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Sathish\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Shiva Kodithyala\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Srikar\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Prabhu\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Sethu\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Murali\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Dhayanesh\"}" $BASE_URL/api/players

# Pool B Teams 7–12
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Vishnu Gatla\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Shiva Prakash\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Partha\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Thiru\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Joe\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Adhi\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Anil\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Ashish Bajaj\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Hemath\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Bala\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Vadi\"}" $BASE_URL/api/players
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Raghav\"}" $BASE_URL/api/players

# Step 3: Form 12 teams (6 per pool, 0-based indices)
echo "Forming 12 teams..."
# Pool A - Teams 1–6 (indices 0–5)
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Vishnu\",\"player2\":\"Ram Prasad\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 1 -> 0
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Gopal S\",\"player2\":\"Suresh P\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 2 -> 1
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Sree J\",\"player2\":\"Sathish\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 3 -> 2
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Shiva Kodithyala\",\"player2\":\"Srikar\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 4 -> 3
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Vishnu Gatla\",\"player2\":\"Shiva Prakash\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 5 -> 6
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Prabhu\",\"player2\":\"Sethu\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 6 -> 4




# Pool B - Teams 7–12 (indices 6–11)
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Partha\",\"player2\":\"Thiru\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 7 -> 7
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Hemath\",\"player2\":\"Bala\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 8 -> 10
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Vadi\",\"player2\":\"Raghav\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 9 -> 11
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Joe\",\"player2\":\"Adhi\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 10 -> 8
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Murali\",\"player2\":\"Dhayanesh\",\"pool\":\"A\"}" $BASE_URL/api/teams  # Team 11 -> 5
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Anil\",\"player2\":\"Ashish Bajaj\",\"pool\":\"B\"}" $BASE_URL/api/teams  # Team 12 -> 9

# Step 4: Create matches from TOURNAMENT tab (15 for Pool A, 15 for Pool B)
echo "Creating matches from TOURNAMENT tab..."
# Pool A (Court 1/2, Teams 1–6 -> 0–5)
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":0,\"team2Idx\":2,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 1 vs Team 3
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":3,\"team2Idx\":5,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 4 vs Team 6
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":7,\"team2Idx\":10,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 8 vs Team 11 (Note: Adjust if incorrect—assuming typo, using 9 for Team 12)
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":2,\"team2Idx\":3,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 3 vs Team 4
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":0,\"team2Idx\":5,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 1 vs Team 6
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":7,\"team2Idx\":2,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 8 vs Team 3
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":10,\"team2Idx\":3,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 11 vs Team 4
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":0,\"team2Idx\":7,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 1 vs Team 8
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":5,\"team2Idx\":2,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 6 vs Team 3
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":10,\"team2Idx\":0,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 11 vs Team 1
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":3,\"team2Idx\":7,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 4 vs Team 8
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":5,\"team2Idx\":10,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 6 vs Team 11  
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":0,\"team2Idx\":3,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 1 vs Team 4
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":2,\"team2Idx\":10,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 3 vs Team 11
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":7,\"team2Idx\":5,\"pool\":\"A\"}" $BASE_URL/api/matches  # Team 8 vs Team 6

# Pool B (Court 3/4, Teams 7–12 -> 6–11)
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":1,\"team2Idx\":4,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 2 vs Team 5
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":6,\"team2Idx\":8,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 7 vs Team 9
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":9,\"team2Idx\":11,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 10 vs Team 12
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":4,\"team2Idx\":6,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 5 vs Team 7
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":1,\"team2Idx\":8,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 2 vs Team 9
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":9,\"team2Idx\":4,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 10 vs Team 5
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":11,\"team2Idx\":6,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 12 vs Team 7
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":1,\"team2Idx\":9,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 2 vs Team 10
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":8,\"team2Idx\":4,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 9 vs Team 5
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":11,\"team2Idx\":1,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 12 vs Team 2
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":6,\"team2Idx\":9,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 7 vs Team 10
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":8,\"team2Idx\":11,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 9 vs Team 12
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":1,\"team2Idx\":6,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 2 vs Team 7
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":4,\"team2Idx\":11,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 5 vs Team 12
curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":8,\"team2Idx\":9,\"pool\":\"B\"}" $BASE_URL/api/matches  # Team 9 vs Team 10


# Verification
echo "Data creation complete. Verify with:"
echo "Players: curl $BASE_URL/api/players"
echo "Teams: curl $BASE_URL/api/teams"
echo "Matches: curl $BASE_URL/api/matches"