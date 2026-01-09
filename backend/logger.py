import csv
import os
from datetime import datetime

#imports csv to read write the logs we are generating

#defined function taakes 4 parameters: unique user identifier, user's input, their response, whether their message contains a crisis message

def log_chat(session_id: str, query: str, response: str, is_crisis: bool, engine_used: str = "chat"):
    log_file = "chat_log.csv"
    file_exists = os.path.isfile(log_file)
#checks whether the log file exists 

#this opens the file in the uppend mode meaning if the file doesn't exist it'll be created 
#newline set to space (allows it to handle processes with diffeernt operating systems)
# initialize the csv writer as a csv file
    with open(log_file, mode="a", newline='', encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)

        # Add the new header only if file is new
        if not file_exists:
            writer.writerow([
                "timestamp",
                "session_id",
                "query",
                "response",
                "crisis_flag",
                "engine_used"
            ])

        writer.writerow([
            datetime.now().isoformat(),
            session_id,
            query,
            response,
            str(is_crisis),
            engine_used
        ])