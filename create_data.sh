#!/bin/bash

# Base URL (change to https://lexington-pb-tournament-backend.onrender.com for production)
BASE_URL="http://localhost:5000"

# Step 1: Purge existing data
echo "Purging existing data..."
curl -X DELETE -H "x-user: admin" $BASE_URL/api/purge

# Step 2: Create 24 players
echo "Creating 24 players..."
for i in {1..24}; do 
  curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"name\":\"Player$i\"}" $BASE_URL/api/players
done

# Step 3: Form 12 teams (6 per pool)
echo "Forming 12 teams (6 in Pool A, 6 in Pool B)..."
for i in {1..6}; do 
  curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Player$((2*i-1))\",\"player2\":\"Player$((2*i))\",\"pool\":\"A\"}" $BASE_URL/api/teams
done
for i in {7..12}; do 
  curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"player1\":\"Player$((2*i-1))\",\"player2\":\"Player$((2*i))\",\"pool\":\"B\"}" $BASE_URL/api/teams
done

# Step 4: Create matches for Pool A (teams 0-5)
echo "Creating matches for Pool A..."
for i in {0..4}; do 
  for j in $(seq $((i+1)) 5); do 
    curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":$i,\"team2Idx\":$j,\"pool\":\"A\"}" $BASE_URL/api/matches
  done
done

# Create matches for Pool B (teams 6-11)
echo "Creating matches for Pool B..."
for i in {6..10}; do 
  for j in $(seq $((i+1)) 11); do 
    curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":$i,\"team2Idx\":$j,\"pool\":\"B\"}" $BASE_URL/api/matches
  done
done

# Step 5: Assign random scores to all matches
echo "Assigning random scores to all matches..."
for i in {0..5}; do 
  for j in $(seq $((i+1)) 5); do 
    score1=$((RANDOM % 12))
    score2=$((RANDOM % $score1))
    if [ $((RANDOM % 2)) -eq 0 ]; then 
      temp=$score1
      score1=$score2
      score2=$temp
    fi
    curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":$i,\"team2Idx\":$j,\"score1\":$score1,\"score2\":$score2}" $BASE_URL/api/matches/score
  done
done
for i in {6..10}; do 
  for j in $(seq $((i+1)) 11); do 
    score1=$((RANDOM % 12))
    score2=$((RANDOM % $score1))
    if [ $((RANDOM % 2)) -eq 0 ]; then 
      temp=$score1
      score1=$score2
      score2=$temp
    fi
    curl -X POST -H "x-user: admin" -H "Content-Type: application/json" -d "{\"team1Idx\":$i,\"team2Idx\":$j,\"score1\":$score1,\"score2\":$score2}" $BASE_URL/api/matches/score
  done
done

# Verification
echo "Data creation complete. Verify with:"
echo "Players: curl $BASE_URL/api/players"
echo "Teams: curl $BASE_URL/api/teams"
echo "Matches: curl $BASE_URL/api/matches"