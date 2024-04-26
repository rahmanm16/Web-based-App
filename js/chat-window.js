// window.addEventListener("load", function () {
//     const sendMessageBtn = document.querySelector("#message-send");
//     const messageToSend = document.querySelector("#message-input");

//     sendMessageBtn.addEventListener("click", sendMessage);

//     function validMessage(message) {
//         return message.length > 0;
//     }

//     function getMessageToSend() {
//         return messageToSend.value.trim();
//     }

//     function sendMessage(message) {
//         const message = getMessageToSend();
//         // Send message to the database
//         messageToSend.value = "";
//     }

//     function displayActiveChat(activeChat) {
//         // Display active chat
//     }

//     // Display recent chats
//     function displayRecentChats() {
//         const recentChatList = document.querySelector("#recent-chat-list");
//         const recentChats = fetchRecentChats();

//         for (chat of recentChats) {
//             const recentChatCard = createRecentChatCard(chat);
//             recentChatList.appendChild(recentChatCard);
//         }
//     }

//     // Create a recent chat card
//     function createRecentChatCard(chat) {
//         const recentChatCard = document.createElement("div");
//         recentChatCard.classList.add("recent-chat-card");

//         const chatDetails = document.createElement("div");
//         chatDetails.classList.add("chat-details");

//         const profilePic = document.createElement("img");
//         profilePic.src = chat.profilePic;
//         profilePic.alt = "Profile Picture";

//         const chatName = document.createElement("h3");
//         chatName.textContent = chatName.name;

//         const lastMessage = document.createElement("p");
//         lastMessage.textContent = chat.message;

//         const lastMessageTime = document.createElement("p");
//         lastMessageTime.textContent = chat.time;

//         chatDetails.appendChild(chatName);
//         chatDetails.appendChild(lastMessage);
//         chatDetails.appendChild(lastMessageTime);

//         recentChatCard.appendChild(profilePic);
//         recentChatCard.appendChild(chatDetails);

//         return recentChatCard;
//     }

//     function createChatBubble(message) {
//         const chatBubble = document.createElement("div");
//         chatBubble.classList.add("chat-bubble");
//         chatBubble.textContent = message;
//         return chatBubble;
//     }
// });
