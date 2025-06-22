#!/bin/bash
set -e

# Get the current timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Define the source file and the backups directory
SOURCE_FILE="client/src/components/LandingPage.tsx"
BACKUPS_DIR="landing_page_backups"
BACKUP_PATH="$BACKUPS_DIR/$TIMESTAMP"

# Create the backups directory if it doesn't exist
mkdir -p "$BACKUP_PATH"

# Copy the file
cp "$SOURCE_FILE" "$BACKUP_PATH/LandingPage.tsx"

echo "✅ Successfully saved version of LandingPage.tsx to $BACKUP_PATH" 