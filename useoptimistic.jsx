import React,{startTransition, useOptimistic, usestate} from 'react';
export default function useoptimistic() {
    const [likes, setLikes] = useState(0);
    const [optimisticLikes, addOptimisticLike] = useOptimistic(likes, (current) => current + 1);

    async function handleLike() {
        startTransition(() => {
            addOptimisticLike();
        });
        console.log("Ui update immediately");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLikes((prevLikes) => prevLikes + 1);
        console.log("Server update completed");
        
    }
    return (
        <div>
            <h2>useOptimistic Example</h2>
            <p>Likes: {optimisticLikes}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    )
}