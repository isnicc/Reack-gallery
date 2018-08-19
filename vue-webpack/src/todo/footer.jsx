import '../assets/styles/todo.styl'
export default {
  data(){
    return {
      footName:'Good boy'
    }
  },
  render(){
    return  (
      <div id="footer">by isni.cc {this.footName}</div>
    )
  }
}