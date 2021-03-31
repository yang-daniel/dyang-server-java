package com.example.wbdvsp2102dyangserverjava.repositories;

import com.example.wbdvsp2102dyangserverjava.models.Widget;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface WidgetRepository
  extends CrudRepository<Widget, Integer> {

  @Query(value = "SELECT * FROM wbdv_sp21_dyang_schema.widgets WHERE topic_id=:tid", nativeQuery = true)
  public List<Widget> findWidgetsForTopic(@Param("tid")String topicId);

  @Query(value = "SELECT * FROM wbdv_sp21_dyang_schema.widgets WHERE id=:wid", nativeQuery = true)
  public List<Widget> findWidgetById(@Param("wid")Integer wid);

}


