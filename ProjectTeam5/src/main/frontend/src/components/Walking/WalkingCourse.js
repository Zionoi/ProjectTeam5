import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './WalkingCourse.css';

function WalkingCourse() {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [subRegions, setSubRegions] = useState([]);
    const [filteredSubRegions, setFilteredSubRegions] = useState([]);
    const [walkingCourses, setWalkingCourses] = useState([]);
    const [regions] = useState([
        '대구', '경남', '대전', '경북', '광주', '제주', '전북', '인천', '울산', '세종',
        '강원', '전남', '서울', '충북', '경기', '충남', '부산'
    ]);

    // 지역 선택 시 호출되는 함수
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        // 선택된 지역에 따른 소속 지역을 업데이트
        if (region) {
            axios.get(`/api/walking/subregions/${region}`)
                .then(response => {
                    setSubRegions(response.data);
                    setFilteredSubRegions(response.data); // 초기 필터링
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setSubRegions([]);
            setFilteredSubRegions([]);
        }
    };

    // 소속 지역 선택 시 호출되는 함수
    const handleSubRegionChange = (e) => {
        const subRegion = e.target.value;
        // 소속 지역 선택에 따른 산책로 데이터를 가져오는 함수 호출
        fetchWalkingCourse(subRegion);
    };

    // 산책로 데이터를 가져오는 함수
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

    // 선택된 지역에 따라 소속 지역을 필터링
    useEffect(() => {
        if (selectedRegion) {
            setFilteredSubRegions(subRegions.filter(subRegion => subRegion !== selectedRegion));
        } else {
            setFilteredSubRegions(subRegions);
        }
    }, [selectedRegion, subRegions]);

    return (
        <div className='walking-Box'>
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
                            <option key={subRegion} value={subRegion}>{subRegion}</option>
                        ))}
                    </select>
                </div>
            )}
            <div>
                <h2>산책로 목록</h2>
                <ul>
                    {walkingCourses.length > 0 ? (
                        walkingCourses.map((course, index) => (
                            <li key={index}>{course.walkCourseName}</li>
                        ))
                    ) : (
                        <li>검색된 산책로가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default WalkingCourse;
