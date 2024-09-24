import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './WalkingCourse.css';

function WalkingCourse() {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [subRegions, setSubRegions] = useState([]);
    const [filteredSubRegions, setFilteredSubRegions] = useState([]);
    const [walkingCourses, setWalkingCourses] = useState([]);
    const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
    const [regions] = useState([
        '강원', '경기', '경남', '경북', '광주', '대구', '대전', '부산', '서울', '세종',
        '울산', '인천', '전남', '전북', '제주', '충남', '충북'
    ]);

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        if (region) {
            axios.get(`/api/walking/subregions/${region}`)
                .then(response => {
                    setSubRegions(response.data);
                    setFilteredSubRegions(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setSubRegions([]);
            setFilteredSubRegions([]);
        }
    };

    const handleSubRegionChange = (e) => {
        const subRegion = e.target.value;
        fetchWalkingCourse(subRegion);
    };

    const fetchWalkingCourse = (subRegion) => {
        axios.get('/api/walking/courses', {
            params: { subRegion: subRegion }
        })
            .then(response => {
                setWalkingCourses(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCourseClick = (courseId) => {
        axios.get(`/api/walking/courses/${courseId}`)
            .then(response => {
                setSelectedCourseDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
            });
    };

    useEffect(() => {
        if (selectedRegion) {
            setFilteredSubRegions(subRegions.filter(subRegion => subRegion !== selectedRegion));
        } else {
            setFilteredSubRegions(subRegions);
        }
    }, [selectedRegion, subRegions]);

    return (
        <div className='walking-Box'>
            <div className='walking-search'>
                <h1>산책로 검색</h1>
                <div>
                    <label htmlFor="region-select">지역 선택:</label>
                    <select
                        id="region-select"
                        value={selectedRegion}
                        onChange={handleRegionChange}
                    >
                        <option value="">-- 지역 선택 --</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                {selectedRegion && (
                    <div>
                        <label htmlFor="subregion-select">소속 지역 선택:</label>
                        <select
                            id="subregion-select"
                            onChange={handleSubRegionChange}
                        >
                            <option value="">-- 소속 지역 선택 --</option>
                            {filteredSubRegions.map(subRegion => (
                                <option key={subRegion} value={subRegion}>{subRegion.slice(3)}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <h2>산책로 목록</h2>
                    <ul>
                        {walkingCourses.length > 0 ? (
                            walkingCourses.map((course, index) => (
                                <li key={index} onClick={() => handleCourseClick(course.esntlId)}>
                                    {course.walkCourseName}
                                </li>
                            ))
                        ) : (
                            <li>검색된 산책로가 없습니다.</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='detailWalking'>
                <h2>상세정보</h2>
                {selectedCourseDetails ? (
                    <table>
                        <tbody>
                            <tr>
                                <td className='walkCourseName' colSpan={7} style={{textAlign:'center'}}>{selectedCourseDetails.walkCourseName}</td>
                            </tr>
                            <tr>
                                <td>난이도</td><td className='courseLevelName'>{selectedCourseDetails.courseLevelName}</td>
                                <td className='courseLengthContent'>경로길이</td><td >{selectedCourseDetails.courseLengthContent}</td>
                                <td  className='courseTimeContent'>산책소요 시간</td><td>{selectedCourseDetails.courseTimeContent}</td>
                            </tr>
                            <tr>
                                <td>주소</td><td className='address' colSpan={7}>{selectedCourseDetails.address}</td>
                            </tr>
                            <tr>
                                <td>산책 경로</td><td className='courseDescription' colSpan={7}>{selectedCourseDetails.courseDescription}</td>
                            </tr>
                            <tr>
                                <td>설명</td><td className='additionalDescription' colSpan={7}>{selectedCourseDetails.additionalDescription}</td>
                            </tr>
                            <tr>
                                <td>참고사항</td><td className='optionDescription' colSpan={7}>{selectedCourseDetails.optionDescription}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>상세 정보를 선택해 주세요.</p>
                )}
            </div>
        </div>
    );
}

export default WalkingCourse;
