import cv2
from groq import Groq
import base64
import os


client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


# 1. Image to Text Description (llama-3.2-90b-vision-preview)
def generate_image_description(image_path):
    try:
        # Read image with OpenCV
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Failed to load image. Check the file path or format.")
        
        # Convert image to bytes and encode to base64
        # Determine the file extension
        ext = image_path.lower().split('.')[-1]
        if ext not in ['jpg', 'jpeg', 'png','heic']:
            raise ValueError("Unsupported image format. Please use JPG, JPEG, or PNG.")
        
        # Use the correct extension for encoding
        if ext == 'png':
            _, buffer = cv2.imencode('.png', img)
        else:
            _, buffer = cv2.imencode('.jpg', img)
            
        image_data = base64.b64encode(buffer).decode("utf-8")
        
        # Call Groq API with vision model
        response = client.chat.completions.create(
            model="llama-3.2-90b-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Describe this image in detail."},
                        {"type": "image_url", "image_url": {"url": f"data:image/{ext};base64,{image_data}"}}
                    ]
                }
            ],
            max_tokens=1024,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        return f"Error processing image: {str(e)}"


def validate_task_completion(task, image_description):
    try:
        prompt = f"""
        Task: {task}
        Image Description: {image_description}
        
        For example look at these:
        - 'read a book': Needs an open book or person reading, not just a closed book.
        - 'go to the gym': Needs exercise or equipment, not just a gym building.
        - 'cook dinner': Needs food being cooked, not just ingredients.
        - 'walk the dog': Needs a dog on a leash outside, not indoors.
        - 'clean the house': Needs cleaning action, not just a clean room.
        
        Respond with exactly Json string of the format:
        {{"isValid": "valid" or "not valid", "reason":"reason for validating or rejecting the proof"}}
        """
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a precise assistant that returns exactly two lines: validity and reasoning."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=512,
            temperature=0.5
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        return f"Task is not valid\nError: {str(e)}"


def check_task_proof(task, image_path):
    image_description = generate_image_description(image_path)
    
    if "Error" in image_description:
        return f"Task is not valid\n{image_description}"
    
    validation_result = validate_task_completion(task, image_description)
    return validation_result
