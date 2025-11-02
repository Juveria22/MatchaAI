from typing import List

CRISIS_KEYWORDS: List[str] = [
    "suicidal", "suicide", "kill myself", "die", "hopeless", "worthless", "can't go on", "give up", "kms", "ending it all", "end it all", "don't want to live",
    "no reason to live"
]

CRISIS_RESPONSE = (
    "You're going through a really tough time. "
    "Know that you are not alone and there are so many people who want to help you. "
    "It's okay to share your feelings. "
    "Please consider reaching out to a trusted contact or talking with a professional: "
    "988 Suicide and Crisis Lifeline\n"
    "Help is always available. "
    "You matter so much. <3"
)

#This function checks if the text contains a crisis words and returns true or false. It does this by converting the user's text to lower case and
#checks if any of the crisi keywords are in the text 
def contains_crisis_keyword(text: str) -> bool:
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in CRISIS_KEYWORDS) 

