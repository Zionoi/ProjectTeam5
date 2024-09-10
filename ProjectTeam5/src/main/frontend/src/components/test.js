// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import StarPoint from "../component/StarPoint";
// import { Col1, Col4, EventCardSpan, EventCardSpanImage, EventListSpan, EventListSpanImage, ListContentContainer, ListContentTag, ListContentTagsContainer, ListHeaderContainer, ListHeaderContainerHead1, ViewChangeSpan, ViewChangeSpanContainer, ViewChangeSpanDot, ViewChangeSpanHamburger } from "../styles/ListStyle";
// import { RightFloatSpan } from "../styles/FaqStyle";

function PopupList() {
   const [list, setList] = useState({eList:[], rPoint: {}});
   const [tags, setTags] = useState([]);
   const [view, setView] = useState('list');
   const {page} = useParams();
   
   // 페이지 리스트 렌더링
   useEffect(() => {
      console.log(page)
      axios.get(`/event/${page}/lists`)
             .then(result => setList(result.data));
      axios.get(`/event/${page}/tags`)
             .then(result => {
                   setTags(result.data.split(','))
                });
   }, [page])
   
   // 페이지 표시 형태 변경(list <-> card)
   const viewToggleHandler = () => {
      setView(view === 'list' ? 'card': 'list')
   }

   /*
      리턴
      <>
         <리스트 헤더 영역>
            <리스트 헤드1 />
            <리스트 스팬 영역>
               <리스트 표시 형태 변경 span />
            </리스트 스팬 영역>
         </리스트 헤더 영역>
         <리스트 컨텐츠 영역>
            {태그 어사이드}
            {컨텐츠 리스트}
         </리스트 콘텐츠 영역>
         <관리 div>
            <우측정렬 span>
               <CRUD 버튼 />
            </우측정렬 span>
         </관리 div>
      </>
   */
   return (
      <span>
         <ListHeaderContainer>
            <ListHeaderContainerHead1>Pop-up List</ListHeaderContainerHead1>
            <div style={{marginRight: '5px'}}>
               <RightFloatSpan>
                  <button>등록</button>
               </RightFloatSpan>
            </div>
            <ViewChangeSpanContainer onClick={viewToggleHandler} islistview={view}>
               <ViewChangeSpan islistview={view}/>
               <ViewChangeSpanHamburger islistview={view}/>
               <ViewChangeSpanDot islistview={view}/>
            </ViewChangeSpanContainer>
         </ListHeaderContainer>
         <ListContentContainer>
            <ShowTag tags={tags} setList={setList} />
            <ShowList list={list} view={view} />
         </ListContentContainer>
      </span>
  );
}


function ShowTag({tags, setList}){

   // 태그 값 초기화
   const [values, setValues] = useState(Array(tags.length).fill(false));
   const [selectedTags, setSelectedTags] = useState(Array(tags.length).fill(''));
   
   // 태그 선택 시 값 토글
   const toggle = (e, i) => {
      const valueToggle = [...values];
      const selected = [...selectedTags];
      valueToggle[i] = !valueToggle[i];
      setValues(valueToggle);
      if(valueToggle[i]){
         selected[i] = e;
      } else {
         selected[i] = '';
      }
      setSelectedTags(selected);
   }
   
   // 태그 전체 해제 시 값 초기화
   const release = () => {
      const releaseToggle = Array(tags.length).fill(false);
      const releaseSelected = Array(tags.length).fill('');
      setValues(releaseToggle);
      setSelectedTags(releaseSelected);
   }
   
   
   useEffect(() => {
      const searchTags = selectedTags.filter(tag => tag !== '');
      if(searchTags.length === 0){
         axios.get(`/event/popup/lists`).then(
            result => setList(result.data))
      }
      else {
         if (searchTags.length === 1){
            axios.get('/event/popup/lists/search/tags', {params: {tags: searchTags.join('')}}).then(
               result => setList(result.data));
         }
         else {
            axios.get('/event/popup/lists/search/tags', {params: {tags: searchTags.join(',')}}).then(
               result => setList(result.data));
         }
      }
   }, [selectedTags])
   
   
   return (
      <ListContentTagsContainer>
         {<ListContentTag onClick={() => release()}>모든 태그 제거</ListContentTag>}
         {tags.map((e, i) => {
            return (<ListContentTag key={i} onClick={() => toggle(e, i)} value={values[i]}>{e}</ListContentTag>)
         })}
      </ListContentTagsContainer>
   )
}


function ShowList({list, view}){
   const {eList, rPoint} = list;
   const navigate = useNavigate();
   
   // eslint-disable-next-line default-case
   switch(view){
      case 'list':
         return (
            <EventListSpan>
               {eList.map((e, i) => {
                  return(
                     <Col1 onClick={() => {navigate(`/event/popup/details/${e.eventNo}`)}} key={e.eventNo}>
                        <span>{e.company}</span>&emsp;
                        <span><EventListSpanImage src={`/img/${(e.images.split(','))[0]}.jpg`} alt="" style={{width: '10%'}}/></span>
                        <span>{e.content}</span>&emsp;
                        <span>{rPoint[e.eventNo] ? 
                          StarPoint(rPoint[e.eventNo]) 
                          : StarPoint(0.0)}</span>
                     </Col1>
                  )
               })}
            </EventListSpan>
         )
      case 'card':
         return (
            <EventCardSpan>
               {eList.map((e, i) => {
                  return(
                     <Col4 onClick={() => {navigate(`/event/popup/details/${e.eventNo}`)}} key={e.eventNo}>
                        <span>{e.company}</span>&emsp;
                        <span><EventCardSpanImage src={`/img/${(e.images.split(','))[0]}.jpg`} alt="" style={{width: '10%'}}/></span>
                        <span>{e.content}</span>&emsp;
                        <span>{rPoint[e.eventNo] ? 
                          StarPoint(rPoint[e.eventNo]) 
                          : StarPoint(0.0)}</span>
                     </Col4>
                  )
               })}
            </EventCardSpan>
         )
   }
   
}

export default PopupList;