import * as d3 from 'd3';
import * as $ from 'jquery';
import { renderWordCloud } from './shared/wordcloud';
import { renderHorizontalBarChat } from './shared/horizontalbarchart.js';
import { renderPieChart } from './shared/piechart.js';
import { renderLineChart } from './shared/linechart.js';
import { renderBoxPlot} from './shared/boxplot.js';

import { EXERCISE, COOKING, SLEEPING, LANGUAGES, EDITOR, SIDE, DISCPLINES, HACKATHONS, DESKTOP, UNI_EXTRAS } from './data/lifestyle';
import { FAVOURITE_MANDATORY, FAVOURITE_ELECTIVE, DISLIKED_MANDATORY, ATTENDANCE, GRADES, PARENT_GRADES } from './data/academics';
import { INTERNATIONAL, PARENT_EDUCATION, ETHNICITY, GENDER, FAMILY_INCOME, HS_EXTRAS } from './data/background';
import { ORIGINAL, CHOOSE_PROGRAM, GENDER_RATING } from './data/outcome';
import { SALARY, WORK_LOCATION, FAVOURITE_LOCATION, AGE_SALARY, HACKATHON_SALARY, SIDE_SALARY, SIDE_SALARY_2, ADMISSION_SALARY, COMPANY_WORK_COUNT, FAVOURITE_COMPANIES } from './data/coop';
import { POST_GRAD, POST_LOCATION } from './data/future';

window.onload = () => {
  renderCoop();
  renderLifestyle();
  renderAcademics();
  renderBackground();
  renderOutcome();
  renderFuture();
}

function drawCoopWordCloud(elem) {
  let data = COMPANY_WORK_COUNT['data'];
  let words: any[] = [];
  for (let name in data) {
    words.push({
      text: name,
      size: Math.sqrt(data[name]) * 10
    });
  }

  let scores = {};
  let data2 = FAVOURITE_COMPANIES['data'];
  for (let i in data2) {
    scores[data2[i][0]] = data2[i][1];
  }
  renderWordCloud(elem, words, scores, 1200, 700);
}

function drawWordCloud(elem, data) {
  let max = 0;
  for (var i in data) {
    if (data[i] > max) { max = data[i]; }
  }

  let wordcloudData: any[] = [];
  for (var i in data) {
    wordcloudData.push({
      text: i,
      size: Math.pow(data[i] * 1.0 / max, 0.25) * 36
    });
  }
  renderWordCloud(elem, wordcloudData, null, 500, 400);
}

function renderCoop() {
  drawCoopWordCloud(d3.select('#coop-cloud'));
  renderBoxPlot(d3.select('#salary'), SALARY, 600, 280);
  renderLineChart(d3.select('#work-location'), WORK_LOCATION, 600, 400);
  renderHorizontalBarChat(d3.select('#favourite-location'), FAVOURITE_LOCATION, 600, 240, true);
  renderBoxPlot(d3.select('#age-salary'), AGE_SALARY, 600, 280);
  renderBoxPlot(d3.select('#hackathon-salary'), HACKATHON_SALARY, 600, 280);
  renderBoxPlot(d3.select('#side-salary'), SIDE_SALARY, 600, 280);
  renderBoxPlot(d3.select('#side-salary-2'), SIDE_SALARY_2, 600, 280);
  renderBoxPlot(d3.select('#admission-salary'), ADMISSION_SALARY, 600, 280);
}

function renderLifestyle() {
  renderHorizontalBarChat(d3.select('#exercise'), EXERCISE, 600, 200, false);
  renderHorizontalBarChat(d3.select('#cooking'), COOKING, 600, 200, false);
  renderHorizontalBarChat(d3.select('#sleeping'), SLEEPING, 600, 360, false);
  renderHorizontalBarChat(d3.select('#languages'), LANGUAGES, 600, 600, true);
  renderHorizontalBarChat(d3.select('#editor'), EDITOR, 600, 320, true);
  renderHorizontalBarChat(d3.select('#side'), SIDE, 600, 300, false);
  renderHorizontalBarChat(d3.select('#hackathons'), HACKATHONS, 600, 160, false);
  renderHorizontalBarChat(d3.select('#disciplines'), DISCPLINES, 600, 660, true);
  renderPieChart(d3.select('#desktop'), DESKTOP, 500, 500);
  drawWordCloud(d3.select('#uni-extras'), UNI_EXTRAS);
}

function renderAcademics() {
  renderBoxPlot(d3.select('#grades'), GRADES, 600, 280);
  renderHorizontalBarChat(d3.select('#favourite-course'), FAVOURITE_MANDATORY, 600, 390, true);
  renderHorizontalBarChat(d3.select('#disliked-course'), DISLIKED_MANDATORY, 600, 420, true);
  renderLineChart(d3.select('#attendance'), ATTENDANCE, 600, 300, {
    range: [1, 5]
  });
  renderBoxPlot(d3.select('#parent-grades'), PARENT_GRADES, 600, 280);
}

function renderBackground() {
  renderHorizontalBarChat(d3.select('#ethnicity'), ETHNICITY, 400, 405, true);
  renderPieChart(d3.select('#international'), INTERNATIONAL, 400, 400);
  renderHorizontalBarChat(d3.select('#parent-education'), PARENT_EDUCATION, 600, 280, true);
  renderPieChart(d3.select('#gender'), GENDER, 400, 400);
  renderHorizontalBarChat(d3.select('#family-income'), FAMILY_INCOME, 400, 200);
  drawWordCloud(d3.select('#hs-extras'), HS_EXTRAS);
}

function renderOutcome() {
  renderHorizontalBarChat(d3.select('#choose-program'), CHOOSE_PROGRAM, 600, 280, true);
  renderBoxPlot(d3.select('#gender-rating'), GENDER_RATING, 600, 280);
}

function renderFuture() {
  renderHorizontalBarChat(d3.select('#post-grad'), POST_GRAD, 600, 150, true);
  renderHorizontalBarChat(d3.select('#post-location'), POST_LOCATION, 600, 180, true);
}
