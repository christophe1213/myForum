import { discussions } from "@/data";
export function  getByidForum(id:string){
    const forum=discussions.find(d=>d.id==id)
    return {
          title:forum?.title,
  author: 'admin',
  time: '2h ago',
  content: 'Feel free to ask questions, share your ideas, and participate in discussions!',
  idForum:id,
  replies: [
    {
      id: 'r1',
      author: 'Andrew',
      content: 'Thanks! Happy to be here.',
      time: '1h ago'
    },
    {
      id: 'r2',
      author: 'Emily',
      content: 'Excited to join the community!',
      time: '2h ago'
    },
    {
      id: 'r3',
      author: 'John',
      content: "I'm looking forward to learning from everyone.",
      time: '4h ago'
    }
  ]
    }
}