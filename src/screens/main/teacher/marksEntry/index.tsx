import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Icon, Strings } from '../../../../assets';
import { ButtonView, Container, HeaderView } from '../../../../components';
import Picker from '../../../../components/picker';
import { useSelector } from 'react-redux';
import { useMarksClassesSelector, useMarksEntriesSelector, useMarksEntrySelector, useMarksPlannerSelector, useMarksPostSelector, useMarksSubjectSelector } from '../../../../redux/selectors/MarksEntrySelector';
import { MarksEntryObjParam } from '../../../../data/model/MarksEntry';
import StoreService from '../../../../redux/StoreService';
import { examEntriesReset } from '../../../../redux/actions/MarksEntryActions';

export function MarksEntry() {
  const [data, setData] = useState([
    { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'Freezed' },
    { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'Freezed' },
    { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'Freezed' },
    { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'Freezed' },
  ]);
  const { isLoading, categories, error } = useMarksEntrySelector();
  const { loading, planners, Error } = useMarksPlannerSelector();
  const { classLoading, classes, ClassError, fetchClasss } = useMarksClassesSelector();
  const { subjectLoading, subjects, fetchSubjects } = useMarksSubjectSelector();
  const { entriesLoading, entries, fetchMarks, entriesError } = useMarksEntriesSelector();
  const { marksLoading, response, postMarks, marksError } = useMarksPostSelector();

  const [cat, setCat] = useState(null);
  const [examination, setExamination] = useState(null);
  const [batches, setBatches] = useState([]);

  const [clas, setClass] = useState(null);

  const [batch, setBatch] = useState(null);

  const [subject, setSubject] = useState(null);
  const plannerArr = planners?.filter(e => e?.examCategoryId === cat?.id) || [];
  const classArr = classes?.reduce((accumulator, current) => {
    let exists = accumulator.find(item => {
      return item.id === current.id;
    });
    if (!exists) {
      accumulator = accumulator.concat(current);
    }
    return accumulator;
  }, []);

  const onChangeObtained = (item: any, index: number, text: string) => {
    const temp = [...entries];
    temp.map((e, x) => {
      if (x == index) {
        e.studentMarks[0].marks = text ? parseInt(text) : '';
      }
    });
    console.log(temp);
    setData(temp);
  };

  useEffect(() => {
    if (clas) {
      let temp = classes?.map(e => {
        if (e?.id == clas?.id) {
          return { batchName: e?.batchName, id: e?.batchId };
        }
      }, []);
      console.log(temp?.filter(e => e));
      setBatches(temp?.filter(e => e));
    }
  }, [clas]);

  useEffect(() => {
    return () => {
      StoreService.dispatch(examEntriesReset());
    };
  }, []);
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.MarksEntry.TITLE} isSearch isNotification />
        <View style={[_styles.upperContent, { justifyContent: 'space-between' }]}>
          <View style={[_styles.upperContent, { paddingHorizontal: 5 }]}>
            <Picker
              dataKey="category"
              title=""
              layout="1"
              data={categories || []}
              value={cat ? cat?.category : 'Select Category'}
              onSelect={val => {
                setCat(val);
              }}
            />
            <Picker
              dataKey="examName"
              title=""
              layout="1"
              data={plannerArr || []}
              value={examination ? examination?.examName : 'Select Examination'}
              onSelect={val => {
                setExamination(val);
                setClass(null);
                setBatch(null);
                setSubject(null);
                fetchClasss({ id: val?.id });
              }}
            />
          </View>
          <ButtonView
            title="Submit"
            style={{ height: 30, paddingHorizontal: 0, width: 80, marginEnd: 5, paddingTop: 0, paddingBottom: 0 }}
            titleStyles={{ fontSize: 14 }}
            onPress={() => {
              if (cat && examination && clas && subject && batch) {
                let tempArr: MarksEntryObjParam[] = entries?.map((it: any, ix) => {
                  return {
                    id: it?.id,
                    examCategoryId: it?.examCatId,
                    examId: it?.examId,
                    batchId: it?.batchId,
                    classId: it?.classId,
                    isCoScholastic: true,
                    studentId: it?.studentId,
                    subjectId: it?.subjectId,
                    marks: it?.studentMarks[0].marks,
                    academicYearId: examination?.academicYearId,
                    evaluvationType: 1,
                  };
                });

                postMarks(tempArr);
              }
            }}
          />
        </View>

        <View style={[_styles.upperContent2, { backgroundColor: Colors.WHITE, marginTop: 2, paddingVertical: 0 }]}>
          <View style={[_styles.upperContent2, , { flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'center' }]}>
            <Picker
              dataKey="className"
              layout="1"
              title="Class"
              data={classArr || []}
              value={clas ? clas?.className : 'Select Class'}
              onSelect={val => {
                setClass(val);
                setBatch(null);
                setSubject(null);
              }}
            />
          </View>
          <View style={[_styles.upperContent2, , { flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'space-around' }]}>
            <Picker
              dataKey="batchName"
              title=""
              layout="1"
              data={batches || []}
              value={batch ? batch?.batchName : 'Select Batch'}
              onSelect={val => {
                setBatch(val);
                setSubject(null);
                fetchSubjects();
              }}
            />
          </View>
          <View style={[_styles.upperContent2, , { flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'space-around' }]}>
            <Picker
              dataKey="subjectName"
              title=""
              layout="1"
              data={subjects || []}
              value={subject ? subject?.subjectName : 'Select Subject'}
              onSelect={val => {
                setSubject(val);
                fetchMarks({ categoryId: cat?.id, examId: examination?.id, classId: clas?.id, batchId: batch?.id, subjectId: val?.id });
              }}
            />
          </View>
        </View>
        <View style={_styles.tableContainer}>
          <FlatList
            renderItem={({ item, index }) => {
              return (
                <View style={[_styles.upperContent, _styles.listItemStyle]}>
                  <View style={[_styles.rollStyle, { paddingVertical: 0 }]}>
                    <TextInput editable={false} style={[_styles.titleStyle2, { paddingHorizontal: 0 }]} value={item.rollNo || ''} />
                  </View>
                  <View style={[_styles.nameStyle, { paddingVertical: 0 }]}>
                    <TextInput editable={false} style={[_styles.titleStyle2, { paddingHorizontal: 0 }]} value={item.studentName || ''} />
                  </View>
                  <View style={[_styles.FullStyle, { paddingVertical: 0 }]}>
                    <TextInput editable={false} style={[_styles.titleStyle2, { paddingHorizontal: 0 }]} value={item.studentMarks?.length > 0 ? item.studentMarks[0].fullMarks?.toString() || '100' : '100'} />
                  </View>
                  <View style={[_styles.obtainedStyle, { paddingVertical: 0 }]}>
                    <TextInput
                      style={[_styles.titleStyle2, { paddingHorizontal: 0 }]}
                      onChangeText={e => onChangeObtained(item, index, e)}
                      keyboardType="numeric"
                      value={item.studentMarks?.length > 0 ? item.studentMarks[0].marks?.toString() || '' : ''}
                    />
                  </View>
                  <View style={[_styles.statusStyle, { paddingVertical: 0 }]}>
                    <TextInput editable={false} style={[_styles.titleStyle2, { paddingHorizontal: 0 }]} value={item.studentMarks?.length > 0 ? item.studentMarks[0].examStatus?.toString() || '' : ''} />
                  </View>
                </View>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View style={[_styles.upperContent, { paddingVertical: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomColor: Colors.GRAY, borderBottomWidth: 1 }]}>
                  <View style={_styles.rollStyle}>
                    <Text style={[_styles.titleStyle, { paddingHorizontal: 0 }]}>Roll</Text>
                  </View>
                  <View style={_styles.nameStyle}>
                    <Text style={[_styles.titleStyle, { paddingHorizontal: 0 }]}>Name</Text>
                  </View>
                  <View style={_styles.FullStyle}>
                    <Text style={[_styles.titleStyle, { paddingHorizontal: 0 }]}>Full</Text>
                  </View>
                  <View style={_styles.obtainedStyle}>
                    <Text style={[_styles.titleStyle, { paddingHorizontal: 0 }]}>Obtain</Text>
                  </View>

                  <View style={_styles.statusStyle}>
                    <Text style={[_styles.titleStyle, { paddingHorizontal: 0 }]}>Status</Text>
                  </View>
                </View>
              );
            }}
            data={entries || []}
          />
        </View>
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  listItemStyle: { paddingVertical: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: Colors.WHITE, borderBottomColor: Colors.GRAY, borderBottomWidth: 1 },
  upperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.CYAN,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  upperContent2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.CYAN,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    paddingHorizontal: 6,
    fontSize: 15,
  },
  titleStyle2: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    paddingHorizontal: 6,
    height: 25,
    fontSize: 14,
    paddingVertical: 0,
  },
  tableContainer: {
    backgroundColor: Colors.WHITE,
  },
  rollStyle: { flex: 0.6, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  nameStyle: { flex: 2, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  FullStyle: { flex: 0.8, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  obtainedStyle: { flex: 1, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  perStyle: { flex: 0.8, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  statusStyle: { flex: 1, paddingVertical: 6, justifyContent: 'center', alignItems: 'center' },
});
