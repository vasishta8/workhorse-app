from langchain_groq import ChatGroq
import json
import os
from dotenv import load_dotenv


groq_api_key = os.getenv("GROQ_API_KEY")
llm = ChatGroq(model_name="llama-3.1-8b-instant", temperature=0.1, api_key=groq_api_key)

# Define the format with one objective per mission
system_format = {
    "main_goal": "User's original goal",
    "missions": [
        {
            "id": "mission_1",
            "title": "Epic title",
            "description": "Immersive story-like challenge introduction.",
            "objective": "Engaging description of what needs to be accomplished",
            "frequency": {
                "type": "one_time | weekly | progressive",
                "start_date": "YYYY-MM-DD",
                "end_date": "YYYY-MM-DD",
                "interval": "daily | weekly | monthly",
                "occurrences": 1
            },
            "rewards": ["Reward #1", "Reward #2"],
            "difficulty": "easy | medium | hard",
            "xp": 50,
            "time_pressure": "yes | no",
            "progress_tracking": {
                "current": 0,
                "total": 1
            }
        }
    ]
}

# Examples with single and multi-mission tasks, one objective each
examples = [
    # Single-mission example (simple goal)
    {
        "main_goal": "Read a Book",
        "missions": [
            {
                "id": "mission_1",
                "title": "Tome of Knowledge",
                "description": "Embark on a quest to conquer a literary realm!",
                "objective": "Complete reading an entire book from cover to cover",
                "frequency": {
                    "type": "one_time",
                    "start_date": "2025-04-01",
                    "end_date": "2025-04-30",
                    "interval": "monthly",
                    "occurrences": 1
                },
                "rewards": ["Wisdom +2", "Reader's Badge"],
                "difficulty": "easy",
                "xp": 50,
                "time_pressure": "no",
                "progress_tracking": {
                    "current": 0,
                    "total": 1
                }
            }
        ]
    },
    # Single-mission example (complex goal)
    {
        "main_goal": "Run a 10k Marathon in 6 Months",
        "missions": [
            {
                "id": "mission_1",
                "title": "Journey of the Fleet-footed",
                "description": "Embark on a quest to conquer the 10k plains!",
                "objective": "Complete a 5k practice run at a steady pace",
                "frequency": {
                    "type": "progressive",
                    "start_date": "2025-04-01",
                    "end_date": "2025-09-30",
                    "interval": "weekly",
                    "occurrences": 1
                },
                "rewards": ["Endurance +3", "Marathon Medal"],
                "difficulty": "hard",
                "xp": 200,
                "time_pressure": "yes",
                "progress_tracking": {
                    "current": 0,
                    "total": 24
                }
            }
        ]
    },
    # Multi-mission example with increasing difficulty
    {
        "main_goal": "Learn Japanese",
        "missions": [
            {
                "id": "mission_1",
                "title": "Mastery of Hiragana",
                "description": "Begin your journey with the foundational script of the East.",
                "objective": "Master the basic Hiragana characters and their pronunciations",
                "frequency": {
                    "type": "weekly",
                    "start_date": "2025-04-01",
                    "end_date": "2025-04-30",
                    "interval": "weekly",
                    "occurrences": 2
                },
                "rewards": ["Script Knowledge +1"],
                "difficulty": "easy",
                "xp": 50,
                "time_pressure": "no",
                "progress_tracking": {
                    "current": 0,
                    "total": 8  # 2 times/week for 4 weeks
                }
            },
            {
                "id": "mission_2",
                "title": "Conquest of Katakana",
                "description": "Advance to the script of foreign words and sounds.",
                "objective": "Learn and practice writing Katakana characters",
                "frequency": {
                    "type": "weekly",
                    "start_date": "2025-05-01",
                    "end_date": "2025-05-31",
                    "interval": "weekly",
                    "occurrences": 2
                },
                "rewards": ["Vocabulary +2"],
                "difficulty": "medium",
                "xp": 100,
                "time_pressure": "no",
                "progress_tracking": {
                    "current": 0,
                    "total": 8  # 2 times/week for 4 weeks
                }
            },
            {
                "id": "mission_3",
                "title": "Siege of Kanji",
                "description": "Storm the fortress of complex characters.",
                "objective": "Learn to write and recognize basic Kanji characters",
                "frequency": {
                    "type": "weekly",
                    "start_date": "2025-06-01",
                    "end_date": "2025-08-31",
                    "interval": "weekly",
                    "occurrences": 1
                },
                "rewards": ["Fluency +3", "Kanji Badge"],
                "difficulty": "hard",
                "xp": 200,
                "time_pressure": "yes",
                "progress_tracking": {
                    "current": 0,
                    "total": 13  # 1 time/week for 13 weeks
                }
            }
        ]
    }
]

system_prompt = f'''
You are a mission designer for an RPG game. Convert real-life goals into game missions.
IMPORTANT: Your response must be ONLY valid JSON, with no additional text or explanation.
Follow this exact format:
{json.dumps(system_format, indent=2)}

Examples of valid responses:
{json.dumps(examples, indent=2)}

Rules:
1. Response must be ONLY valid JSON
2. Follow the exact format shown, with all required fields filled
3. No additional text before or after the JSON
4. Dates must be in "YYYY-MM-DD" format and align with the current date of April 01, 2025 (e.g., start_date should be on or after 2025-04-01)
5. "frequency" must include "type", "start_date", "end_date", "interval", and "occurrences"
6. "progress_tracking" must reflect the total number of completions needed based on frequency
7. "xp" must be assigned based on difficulty: easy = 50, medium = 100, hard = 200
8. Analyze the goal's complexity to determine the number of missions:
   - Simple goals (e.g., "Read a Book", "Go to Gym") that can be completed in a short time (e.g., within a month) or require minimal steps should have 1 mission.
   - Complex goals (e.g., "Learn Japanese", "Run a 10k Marathon") that require multiple steps or an extended time frame (e.g., several months) should be broken into 1-3 missions.
9. Objectives should be descriptive and engaging, focusing on what needs to be accomplished without mentioning verification methods
10. For multi-mission goals, difficulty must increase progressively (easy → medium → hard) or stay the same, never decrease
11. All strings must be in double quotes
12. No trailing commas
'''

def gamify_user_goal(user_input: str) -> str:
    """
    Convert a user's goal into a gamified mission JSON string with single or multiple missions and XP points.
    Args:
        user_input (str): The user's goal (e.g., "Learn Japanese").
    Returns:
        str: Valid JSON string or error message in JSON format.
    """
    user_prompt = f"Convert this goal into missions (respond ONLY with valid JSON): {user_input}"
    
    try:
        # Get response from LLM
        output = llm.invoke([
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ])
        
        # Parse and validate the response
        output_json = json.loads(output.content)
        
        # Check required fields
        if not all(key in output_json for key in ["main_goal", "missions"]):
            return json.dumps({"error": "Missing required fields: main_goal or missions"})
        if not isinstance(output_json["missions"], list) or not output_json["missions"]:
            return json.dumps({"error": "Missions must be a non-empty list"})
        
        # XP and difficulty mapping
        xp_values = {"easy": 50, "medium": 100, "hard": 200}
        difficulty_order = {"easy": 1, "medium": 2, "hard": 3}
        
        # Validate missions
        prev_difficulty = 0
        for mission in output_json["missions"]:
            required_fields = ["id", "title", "description", "objective", "frequency", "rewards", "difficulty", "xp", "time_pressure", "progress_tracking"]
            if not all(key in mission for key in required_fields):
                return json.dumps({"error": f"Missing required mission field in {mission.get('id', 'unknown')}"})
            if "objectives" in mission:
                return json.dumps({"error": f"Use 'objective' (singular) instead of 'objectives' in {mission['id']}"})
            
            freq = mission["frequency"]
            freq_required = ["type", "start_date", "end_date", "interval", "occurrences"]
            if not all(key in freq for key in freq_required):
                return json.dumps({"error": f"Missing required frequency field in {mission['id']}"})
            
            prog = mission["progress_tracking"]
            if not all(key in prog for key in ["current", "total"]):
                return json.dumps({"error": f"Missing progress_tracking field in {mission['id']}"})
            
            # Validate XP matches difficulty
            difficulty = mission["difficulty"]
            if difficulty not in xp_values:
                return json.dumps({"error": f"Invalid difficulty '{difficulty}' in {mission['id']}"})
            if mission["xp"] != xp_values[difficulty]:
                return json.dumps({"error": f"XP {mission['xp']} does not match difficulty '{difficulty}' in {mission['id']}"})
            
            # Ensure objective is a string
            if not isinstance(mission["objective"], str):
                return json.dumps({"error": f"Objective must be a string in {mission['id']}"})
            
            # Check difficulty progression for multi-mission goals
            if len(output_json["missions"]) > 1:
                current_difficulty = difficulty_order[difficulty]
                if current_difficulty < prev_difficulty:
                    return json.dumps({"error": f"Difficulty decreases from {prev_difficulty} to {current_difficulty} in {mission['id']}"})
                prev_difficulty = current_difficulty
        
        # Return the JSON string
        return json.dumps(output_json)
    
    except json.JSONDecodeError:
        return json.dumps({"error": "Invalid JSON response from model"})
    except Exception as e:
        return json.dumps({"error": str(e)})

# Test the function
user_input_simple = "Go to gym daily"
result_simple = gamify_user_goal(user_input_simple)
with open('gym_goal.json', 'w') as f:
    f.write(result_simple)

# print("\nSingle Mission Example (Complex Goal):")
# user_input_single = "Run a 10k Marathon in 6 Months"
# result_single = gamify_user_goal(user_input_single)
# print(result_single)

# print("\nMulti-Mission Example:")
# user_input_multi = "Learn Japanese"
# result_multi = gamify_user_goal(user_input_multi)
# print(result_multi)